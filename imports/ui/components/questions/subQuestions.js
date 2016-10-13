import { Template } from 'meteor/templating';
import { questionId } from '/imports/ui/components/questions/questions.js';
import { Questions } from '/imports/api/questions/questions.js';
import Sugar from 'sugar';
import './subQuestions.html';


Template.subQuestions.helpers({
    getSubQuestions: function(id){
        const questions = Questions.find({}).fetch();
        const groupedQuestions = Sugar.Array.groupBy(questions, function(n) {
            return n.parentId;
        });

        return groupedQuestions ? groupedQuestions[id] : [];
    },
    subData: function(){
        return Template.parentData();
    }
});

Template.subQuestions.events({
    "click .set-question-id": function(event, template){
        const dataId = $(event.target).data('id');
        questionId.set(dataId);
    }
});
