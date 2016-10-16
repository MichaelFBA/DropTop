import { Questions } from '/imports/api/questions/questions.js';
import Sugar from 'sugar';

export const GetQuestions = function(){
    const questions = Questions.find({}).fetch();
    const groupedQuestions = Sugar.Array.groupBy(questions, function(n) {
        return n.parentId;
    });
    if(groupedQuestions.hasOwnProperty('undefined')){
        groupedQuestions.primary = groupedQuestions['undefined'];
        delete groupedQuestions['undefined'];
        return groupedQuestions
    }
}
