import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
import { Tags, insertTag, deleteTag } from '/imports/api/tags/tags.js';
import './tags.html';

Template.tags.onCreated(function() {
  this.autorun(() => {
    this.subscribe('tags.getAll');
  });
});


Template.tags.helpers({
    tags: function(){
        return Tags.find({});
    },
});

Template.tags.events({
    "submit .new-tag": function(event, template){
        event.preventDefault();

        const data = {
            tag: event.target.tag.value
        };

        insertTag.call(data, function(error, result){
            if(error){
                console.log("error", error);
            }
            if(result){
                console.log("result", result);
            }
        });
        event.target.tag.value = '';
    },
    "click .remove": function(event, template){

        const data = {
            _id: $(event.target).data('id')
        };

        deleteTag.call(data, function(error, result){
            if(error){
                console.log("error", error);
            }
            if(result){
                console.log("result", result);
            }
        });
    }
});
