import { Template } from 'meteor/templating';
import './questionnaire.html'

Template.questionnaire.helpers({
    tags: function(){
        return [
            { tag: 'gaming'},
            { tag: 'office'},
            { tag: 'productivity'},
            { tag: 'vr'},
            { tag: 'streaming'},
        ]
    },
    destroyed: function(){

    },
});

Template.questionnaire.events({
    "click #foo": function(event, template){

    }
});
