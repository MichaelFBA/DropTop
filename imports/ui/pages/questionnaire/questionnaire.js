import { Template } from 'meteor/templating';
import { Questions } from '/imports/api/questions/questions.js';
import { ReactiveVar } from 'meteor/reactive-var';
import { GetQuestions } from '/imports/api/questions/questionHelpers.js';
import { Navigator } from '/imports/api/navigator/navigator.js';
import { ProfileTags } from '/imports/ui/components/profileTags/profileTags.js';
import Sugar from 'sugar';
import './questionnaire.html'

Template.questionnaire.onCreated(function() {
    this.autorun(() => {
        this.subscribe('questions.getAll');
        this.subscribe('tags.getAll');
        this.subscribe('answers.getAll');
        Navigator.setPosition(FlowRouter.getParam("questionId"))
    });
});

Template.questionnaire.helpers({
    currentQuestion: function(){
        return Navigator.primaryPosition.get() + 1;
    },
    primaryQuestionCount: function(){
        const questions = GetQuestions();
        return questions ? questions.primary.length : 0;
    },
    question: function(){
        return Questions.findOne({_id: FlowRouter.getParam("questionId")});
    },
    answers: function(){
        const questions = GetQuestions();
        return questions ? questions.primary[Navigator.primaryPosition.get()].answers : [];
    },
});

Template.questionnaire.events({
    "change .custom-select": function(event, template){
        const current = Navigator.primaryPosition.get();
        const questions = GetQuestions();
        const profileTags = ProfileTags.get();

        //No
        if(event.target.value === 'No'){
            Navigator.goToNextStep('primary');
        }else{
            //Yes
            Sugar.Array.unique(Sugar.Array.insert(profileTags, event.target.value, 0));
            ProfileTags.set(profileTags);
            Navigator.goToNextStep('children');
        }

        //Reset Answer
        event.target.value = 0;
    },
    'click .customer-tags .close': function(event){
        const id = event.currentTarget.getAttribute('data-id');
        const profileTags = ProfileTags.get();

        Sugar.Array.remove(profileTags, id)
        ProfileTags.set(profileTags);
    }
});
