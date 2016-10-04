import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var'
import { $ } from 'meteor/jquery';
import Sugar from 'sugar';
import { Tags } from '/imports/api/tags/tags.js';

Template.questionTags.onCreated(function() {
  this.attachedTags = new ReactiveVar;
  this.attachedTags.set([]);
});

Template.questionTags.helpers({
    attachedTags: function(){
        return Sugar.Array.unique(Template.instance().attachedTags.get());
    }
});

Template.questionTags.events({
    "click .add-tag": function(event, template){

        const data = $(event.target).data('id');
        var current = Template.instance().attachedTags.get()
        current.push(data);
        Template.instance().attachedTags.set(current);
    },
    "click .remove-tag": function(event, template){

        const data = $(event.target).data('id');
        var current = Template.instance().attachedTags.get()
        Sugar.Array.remove(current, data)
        Template.instance().attachedTags.set(current);
    },
});
