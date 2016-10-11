import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
import { Questions, insertQuestion, deleteQuestion, updateQuestionAnswers } from '/imports/api/questions/questions.js';
import { Answers, insertAnswer } from '/imports/api/answers/answers.js';
import { ReactiveVar } from 'meteor/reactive-var'
import { Tags } from '/imports/api/tags/tags.js';
import './questions.html';

Template.questions.onCreated(function() {
    this.questionId = new ReactiveVar;
    this.questionId.set(null);

  this.autorun(() => {
    this.subscribe('questions.getAll');
    this.subscribe('answers.getAll');
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
    getSubQuestions: function(id){
        return Questions.find({parentId: id});
    }
});

Template.questions.events({
    "submit .new-question": function(event, template){
        event.preventDefault();
        const answerData = { answer: event.target.answer.value };
        const questionData = {
            question: event.target.question.value,
            answers: [{
                tag: event.target.tags.value
            }]
        };

        insertAnswer.call(answerData, function(error,result){
            if(result){
                questionData.answers[0].answer = result;
                insertQuestion.call(questionData);
            }
        });
    },
    "click .remove": function(event, template){

        const data = {
            _id: $(event.target).parent().data('id')
        };

        deleteQuestion.call(data, function(error, result){
            if(error){
                console.log("error", error);
            }
            if(result){
                console.log("result", result);
            }
        });
    },
    "click .set-question-id": function(event, template){
        const dataId = $(event.target).data('id');
        Template.instance().questionId.set(dataId);
    },
    "submit .new-sub-question": function(event, template){
         event.preventDefault();

         const answerData = { answer: event.target.answer.value };
         const questionData = {
             question: event.target['sub-question'].value,
             parentId: Template.instance().questionId.get(),
             answers: [{
                 tag: event.target.tags.value
             }]
         };

         insertAnswer.call(answerData, function(error,result){
             if(result){
                 questionData.answers[0].answer = result;
                 insertQuestion.call(questionData);
             }
         });

     },
     "submit .add-answer": function(event, template){
         event.preventDefault();
         const answerData = { answer: event.target.answer.value };
         const questionData = {
             _id: Template.instance().questionId.get(),
             answers: {
                 tag: event.target.tags.value
             }
         };

         insertAnswer.call(answerData, function(error,result){
             if(result){
                 questionData.answers.answer = result;
                 updateQuestionAnswers.call(questionData);
             }
         });
     },
});
