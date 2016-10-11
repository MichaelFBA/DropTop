import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var'
import { $ } from 'meteor/jquery';
import Sugar from 'sugar';
import { Specifications } from '/imports/api/specifications/specifications.js';
import { Tags } from '/imports/api/tags/tags.js';
import { Inventory, insertInventory, deleteInventory } from '/imports/api/inventory/inventory.js';

import './inventory.html';

Template.inventory.onCreated(function() {
  this.autorun(() => {
    this.subscribe('specifications.getAll');
    this.subscribe('tags.getAll');
    this.subscribe('inventory.getAll');
  });
  this.attachedTags = new ReactiveVar;
  this.attachedTags.set([]);
});

Template.inventory.helpers({
    inventory: function(){
        return Inventory.find({});
    },
    tags: function(){
        return Tags.find({});
    },
    attachedTags: function(){
        return Sugar.Array.unique(Template.instance().attachedTags.get());
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
    "submit .new-inventory": function(event, template){
        event.preventDefault();

        //Input
        const data = {
            sku: event.target.sku.value,
            description: event.target.description.value,
            rrp: +event.target.rrp.value,
            wholesalePrice: +event.target.wholesalePrice.value,
            brand: event.target.brand.value,
            sku: event.target.sku.value,
            specifications: [],
            tags: Template.instance().attachedTags.get()
        };
        //Select
        $('.new-inventory select').each(function(){
            data.specifications.push($(this).val());
        })

        insertInventory.call(data, function(error, result){
            if(error){
                console.log("error", error);
            }
            if(result){
                console.log("result", result);
            }
        });

    },
    "click .add-tag": function(event, template){

        const data = $(event.target).data('id');
        var current = Template.instance().attachedTags.get()
        current.push(data);
        Template.instance().attachedTags.set(current);
    },
    "click .remove-tag": function(event, template){

        const data = $(event.target).parent().data('id');
        var current = Template.instance().attachedTags.get()
        Sugar.Array.remove(current, data)
        Template.instance().attachedTags.set(current);
    },
    "click .remove-inventory": function(event, template){

        const data = {
            _id: $(event.target).parent().data('id')
        };

        deleteInventory.call(data, function(error, result){
            if(error){
                console.log("error", error);
            }
            if(result){
                console.log("result", result);
            }
        });
    }
});
