import { Template } from 'meteor/templating';
import { Session } from 'meteor/session'
import { $ } from 'meteor/jquery';
import Sugar from 'sugar';
import { Specifications } from '/imports/api/specifications/specifications.js';
import { Tags } from '/imports/api/tags/tags.js';

import './inventory.html';

Template.inventory.onCreated(function() {
  this.autorun(() => {
    this.subscribe('specifications.getAll');
    this.subscribe('tags.getAll');
    this.subscribe('inventory.getAll');
  });
  Session.set("attachedTags", []);
});

Template.inventory.helpers({
    tags: function(){
        return Tags.find({});
    },
    attachedTags: function(){
        return Sugar.Array.unique(Session.get("attachedTags"));
    },
    specifications: function(){
        return Specifications.find({});
    },
    uniqueSpecifications: function(){
        var specs = Specifications.find().fetch();
        return Sugar.Array.unique(specs, function(spec){
            return spec.type;
        });
    },
    uniqueSpecificationsOptions: function(type){
        return Specifications.find({'type': type});
    }
});

Template.inventory.events({
    "submit .new-spec": function(event, template){
        event.preventDefault();

        const data = {
            type: event.target.type.value,
            value: event.target.value.value
        };

        insertSpec.call(data, function(error, result){
            if(error){
                console.log("error", error);
            }
            if(result){
                console.log("result", result);
            }
        });
        event.target.type.value = event.target.value.value = '';
    },
    "click .add-tag": function(event, template){

        const data = $(event.target).data('id');
        var current = Session.get("attachedTags");
        current.push(data);
        Session.set("attachedTags", current);
    },
    "click .remove-tag": function(event, template){

        const data = $(event.target).data('id');
        var current = Session.get("attachedTags");
        Sugar.Array.remove(current, data)
        Session.set("attachedTags", current);
    }
});
