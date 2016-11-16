import { ReactiveVar } from 'meteor/reactive-var';
import { Survey } from '/imports/api/survey/survey.js';
import Sugar from 'sugar';

export const Navigator = {
    tracker: new ReactiveVar(),

    newTracker: function(){
        Navigator.tracker.set({
            questions: [],
            currentPosition: 0
        });
    },

}
