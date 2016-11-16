import { Template } from 'meteor/templating';
import { Navigator } from '/imports/api/navigator/navigator.js';
import { ProfileTags } from '/imports/ui/components/profileTags/profileTags.js';
import Sugar from 'sugar';
import './select.html';

Template.select.events({
    'change .custom-select': function(event, template){
        const tracker = Navigator.tracker.get();
        const profileTags = ProfileTags.get();

        //if yes
        if(event.target.value !== "No"){
            //if has additional questions
            if(template.data.questions){
                Sugar.Array.append(tracker.questions, template.data.questions, tracker.currentPosition + 1);
            }
            //Add Tag
            if(event.target.value){
                Sugar.Array.append(profileTags, event.target.value);
                ProfileTags.set(profileTags);
            }
        }
    }
});
