import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
import { Specifications, insertSpec, deleteSpec } from '/imports/api/specifications/specifications.js';
import './specifications.html';

Template.specifications.onCreated(function() {
  this.autorun(() => {
    this.subscribe('specifications.getAll');
  });
});


Template.specifications.helpers({
    specifications: function(){
        return Specifications.find({});
    },
});

Template.specifications.events({
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
    "click .remove": function(event, template){

        const data = {
            _id: $(event.target).data('id')
        };

        deleteSpec.call(data, function(error, result){
            if(error){
                console.log("error", error);
            }
            if(result){
                console.log("result", result);
            }
        });
    }
});
