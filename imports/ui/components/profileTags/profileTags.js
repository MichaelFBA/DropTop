import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './profileTags.html';

export const ProfileTags = new ReactiveVar([]);

Template.profileTags.helpers({
    profileTags: function(){
        return ProfileTags.get();
    },
});

Template.profileTags.events({
    "click #foo": function(event, template){

    }
});
