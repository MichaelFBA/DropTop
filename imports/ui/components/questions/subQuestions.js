import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
import { Questions, insertQuestion } from '/imports/api/questions/questions.js';


Template.subQuestions.helpers({
    isParent: function(question){
        return question.parentId ? question.parentId === Template.instance().data.q._id : false;
    }
});


Template.subQuestions.events({
    "submit .new-sub-question": function(event, template){
        event.preventDefault();

        const data = {
            question: event.target['sub-question'].value,
            parentId: template.data.q._id
        };

        insertQuestion.call(data, function(error, result){
            console.log(result)
        });

    }
});
