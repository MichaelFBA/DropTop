import { Template } from 'meteor/templating';
import { Survey } from '/imports/api/survey/survey.js';
import { ReactiveVar } from 'meteor/reactive-var'
import './newQuestionnaire.html'

Template.newQuestionnaire.onCreated(function() {
    this.firstQuestion = new ReactiveVar;
    this.firstQuestion.set('new');

    this.autorun(() => {
        //This subscribes to survey data, we can make this dynamic later
        this.subscribe('survey.getByType', "computers");
    });
});

Template.newQuestionnaire.onRendered(function(){
    this.autorun(function(){
        var q = Survey.find({}).fetch();
        if(q.length){
            Template.instance().firstQuestion.set(q[0]._id);
        }
    });
})

Template.newQuestionnaire.events({
    "click #go-to-first-question": function(event, template){
        FlowRouter.go('/questionnaire/'+ Template.instance().firstQuestion.get());
    }
});
