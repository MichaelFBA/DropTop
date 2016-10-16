import { GetQuestions } from '/imports/api/questions/questionHelpers.js';
import { ReactiveVar } from 'meteor/reactive-var';
import Sugar from 'sugar';

export const Navigator = {
    primaryPosition: new ReactiveVar(null),

    goToNextStep: function(step){
        const id = FlowRouter.getParam("questionId");
        const questions = GetQuestions();
        switch (step) {
            case 'primary':
                questions.primary.length >= this.primaryPosition.get() ? FlowRouter.go('/profile/') : FlowRouter.go('/questionnaire/'+ questions.primary[this.primaryPosition.get() + 1]._id);
                break;
            case 'children':
                FlowRouter.go('/questionnaire/'+ questions.primary[this.primaryPosition.get() + 1]._id);
                break;
            default:
                FlowRouter.go('/questionnaire/'+ questions.primary[this.primaryPosition.get() + 1]._id);
        }

    },

    setPosition: function(id){
        const questions = GetQuestions();
        if(questions) {
            //Set Primary
            const index = Sugar.Array.findIndex(questions.primary, function(q) {
                return q._id === id;
            });
            if( index !== -1 ){
                this.primaryPosition.set(index);
            }
        }
    }
}
