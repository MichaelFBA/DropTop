import { Template } from 'meteor/templating';
import { Questions } from '/imports/api/questions/questions.js';
import { ReactiveVar } from 'meteor/reactive-var'
import './newQuestionnaire.html'

Template.newQuestionnaire.onCreated(function() {
    this.firstQuestion = new ReactiveVar;
    this.firstQuestion.set('new');

    this.autorun(() => {
        this.subscribe('questions.getAll');
    });
});

Template.newQuestionnaire.onRendered(function(){
    this.autorun(function(){
        var q = Questions.find({ "parentId" : { "$exists" : false } }).fetch();
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
