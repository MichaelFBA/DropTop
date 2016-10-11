import { Template } from 'meteor/templating';
import { Questions } from '/imports/api/questions/questions.js';
import './questionnaire.html'

Template.questionnaire.onCreated(function() {
  this.autorun(() => {
    this.subscribe('questions.getAll');
  });
});

Template.questionnaire.helpers({
    tags: function(){
        return [
            { tag: 'gaming'},
            { tag: 'office'},
            { tag: 'productivity'},
            { tag: 'vr'},
            { tag: 'streaming'},
        ]
    },
    allQuestions: function(){
        return Questions.find({});
    },
    parentQuestions: function(){
        return Questions.find({ "parentId" : { "$exists" : false } });
    },
    parentQuestionsCount: function(){
        return Questions.find({ "parentId" : { "$exists" : false } }).count();
    }
});

Template.questionnaire.events({
    "click #foo": function(event, template){

    }
});
