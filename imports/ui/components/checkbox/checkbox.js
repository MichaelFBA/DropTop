import { Template } from 'meteor/templating';
import { Navigator } from '/imports/api/navigator/navigator.js';
import { ProfileTags } from '/imports/ui/components/profileTags/profileTags.js';
import Sugar from 'sugar';
import './checkbox.html';

Template.checkbox.events({
    'change .custom-checkbox input': function(event, template){
        const profileTags = ProfileTags.get();

        //Add / Remove Tags
        if(event.target.checked){
            Sugar.Array.append(profileTags, event.target.value);
            ProfileTags.set(profileTags);
        }else{
            Sugar.Array.remove(profileTags, event.target.value)
            ProfileTags.set(profileTags);
        }
    }
});
