import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
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
    dynamicWidth: function(){
        var width = 0;
        $('.overflow-sideways .tag').each(function(){
            if($(this).width() === 0) return;
            width += $(this).width();
        })
        return width;
    },
    destroyed: function(){

    },
});

Template.questionnaire.events({
    "click #foo": function(event, template){

    }
});
