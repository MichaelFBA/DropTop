import { Template } from 'meteor/templating';
import { Survey } from '/imports/api/survey/survey.js';
import { ReactiveVar } from 'meteor/reactive-var';
import { Navigator } from '/imports/api/navigator/navigator.js';
import { ProfileTags } from '/imports/ui/components/profileTags/profileTags.js';
import Sugar from 'sugar';
import './questionnaire.html'

Template.questionnaire.onCreated(function() {
    Navigator.newTracker([]);

    this.autorun(() => {
        this.subscribe('survey.getById', FlowRouter.getParam("id"), function(){
            const survey = Survey.findOne({_id: FlowRouter.getParam("id")});
            const tracker = Navigator.tracker.get();
            Sugar.Array.append(tracker.questions, survey.questions);
            Navigator.tracker.set(tracker);
        });
        this.subscribe('tags.getAll');
    });
});

Template.questionnaire.helpers({
    survey: function(){
        return Survey.findOne({_id: FlowRouter.getParam("id")});
    },
    question: function(){
        const tracker = Navigator.tracker.get();
        return tracker ? tracker.questions[tracker.currentPosition] : null;
    },
    trakerData: function(){
        return Navigator.tracker.get();
    },
    childData: function(){
        const instance = Template.instance();
        const tracker = Navigator.tracker.get();
        return {
            question: tracker ? tracker.questions[tracker.currentPosition] : null,
            onChange: function(event){
                console.log(event)
            }
        }
    }
});

Template.questionnaire.events({
    "click #next-question": function(event, template){
        const tracker = Navigator.tracker.get();
        tracker.currentPosition++;
        Navigator.tracker.set(tracker);
        if(tracker.currentPosition >= tracker.questions.length){
            //End questionnaire
            //TODO save questions and tags in user profile
            FlowRouter.go('/profile/');
        }

    },
    'click .customer-tags .close': function(event){
        const id = event.currentTarget.getAttribute('data-id');
        const profileTags = ProfileTags.get();

        Sugar.Array.remove(profileTags, id)
        ProfileTags.set(profileTags);
    }
});
