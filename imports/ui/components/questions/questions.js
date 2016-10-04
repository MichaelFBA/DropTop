import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
import { Questions, insertQuestion, deleteQuestion } from '/imports/api/questions/questions.js';
import { Tags } from '/imports/api/tags/tags.js';
import './questions.html';
import './questionTags.js';
import './subQuestions.js';

Template.questions.onCreated(function() {
  this.autorun(() => {
    this.subscribe('questions.getAll');
  });
});


Template.questions.helpers({
    questions: function(){
        return Questions.find({});
    },
    isParent: function(question){
        return !question.hasOwnProperty("parentId");
    },
    tags: function(){
        return Tags.find({});
    },
});

Template.questions.events({
    "submit .new-question": function(event, template){
        event.preventDefault();

        const data = {
            question: event.target.question.value
        };

        insertQuestion.call(data);
    },
    "click .remove": function(event, template){

        const data = {
            _id: $(event.target).data('id')
        };

        deleteQuestion.call(data, function(error, result){
            if(error){
                console.log("error", error);
            }
            if(result){
                console.log("result", result);
            }
        });
    }
});
