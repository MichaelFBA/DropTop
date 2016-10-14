import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
import { Questions, insertQuestion, deleteQuestion, updateQuestionAnswers } from '/imports/api/questions/questions.js';
import { Answers, insertAnswer, deleteAnswer } from '/imports/api/answers/answers.js';
import { ReactiveVar } from 'meteor/reactive-var';
import Sugar from 'sugar';
import { Tags } from '/imports/api/tags/tags.js';
import './questions.html';

export const questionId = new ReactiveVar(null);

Template.questions.onCreated(function() {
    this.isChecked = new ReactiveVar;
    this.isChecked.set(false);

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
    checked: function(){
        return Template.instance().isChecked.get();
    },
    isAddingSubQuestion: function(){
        return questionId.get();
    }
});

Template.questions.events({
    "change .check-changed": function(event){
        Template.instance().isChecked.set(event.target.checked);
    },
    "submit .new-question": function(event, template){
        event.preventDefault();

        //If yes/no answer or normal question and answer
        Template.instance().isChecked.get() ? insertYesNo(event) : insertAnswerThenQuestion(event);
    },
    "click .remove": function(event, template){

        const data = {
            _id: $(event.target).data('id')
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
            //Exclude YES/NO
            const updatedArray = Sugar.Array.exclude(answersArray, function(a) {
                return a._id === '5aNWRkqQtwPRQBiqQ' || 'uqCcycttSHGbLioNC';
            });
            updatedArray.forEach(function(a){
                deleteAnswer.call({_id: a.answer});
            })
        }

    },
    "click .set-question-id": function(event, template){
        const dataId = $(event.target).data('id');
        questionId.set(dataId);
    },
    "click .remove-question-id": function(event, template){
        questionId.set(null);
    },
     "submit .add-answer": function(event, template){
         event.preventDefault();
         const answerData = { answer: event.target.answer.value };
         const questionData = {
             _id: questionId.get(),
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

function insertAnswerThenQuestion(event){
    const answerData = { answer: event.target.answer.value };
    insertAnswer.call(answerData, function(error,result){
        if(result){
            const questionData = {
                question: event.target.question.value,
                answers: [{
                    answer: result,
                    tag: event.target.tags.value
                }]
            };
            insertQuestion.call(questionId.get() ? modifyIfParent(questionData) : questionData);
        }
    });
};

function insertYesNo(event, Template){
    const questionData = {
        question: event.target.question.value,
        answers: [
            {
                tag: event.target.tags.value,
                answer: '5aNWRkqQtwPRQBiqQ' //yes
            },
            {
                tag: '',
                answer: 'uqCcycttSHGbLioNC' //no
            }
        ]
    };
    insertQuestion.call(questionId.get() ? modifyIfParent(questionData) : questionData);
};

function modifyIfParent(data){
    data.parentId = questionId.get()
    return data;
}
