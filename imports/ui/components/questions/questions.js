import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
import { Questions, insertQuestion, deleteQuestion, updateQuestionAnswers } from '/imports/api/questions/questions.js';
import { Answers, insertAnswer, deleteAnswer } from '/imports/api/answers/answers.js';
import { ReactiveVar } from 'meteor/reactive-var';
import Sugar from 'sugar';
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
        const questions = Questions.find({}).fetch();
        const groupedQuestions = Sugar.Array.groupBy(questions, function(n) {
            return n.parentId;
        });
        if(groupedQuestions.hasOwnProperty('undefined')){
            groupedQuestions.primary = groupedQuestions['undefined'];
            delete groupedQuestions['undefined'];
            return groupedQuestions
        }
    },
    isParent: function(question){
        return !question.hasOwnProperty("parentId");
    },
    tags: function(){
        return Tags.find({});
    },
    getSubQuestions: function(questions, id){
        return questions ? questions[id] : [];
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
    "click .fa-remove": function(event, template){

        const data = {
            _id: $(event.target).parent().data('id')
        };
        const toDelete = Questions.findOne({_id: data._id});
        const childrenToDelete = Questions.find({parentId: data._id}).fetch();

        //Delete All sub Children Answers & Questions
        if(childrenToDelete && childrenToDelete.length){
            childrenToDelete.forEach(function(childQuestion){
                if(childQuestion && childQuestion.answers){
                    deleteAnswers(childQuestion.answers)
                }
                deleteQuestion.call({_id: childQuestion._id});
            })
        }

        //Delete Current Answers
        if(toDelete && toDelete.answers){
            deleteAnswers(toDelete.answers)
        }
        //Delete Current Question
        deleteQuestion.call(data);


        function deleteAnswers(answersArray){
            answersArray.forEach(function(a){
                deleteAnswer.call({_id: a.answer});
            })
        }

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
