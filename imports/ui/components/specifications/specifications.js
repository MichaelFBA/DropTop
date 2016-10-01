import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
import Sugar from 'sugar';
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
