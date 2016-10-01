import { Mongo } from 'meteor/mongo';
import { Random } from 'meteor/random';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

export const Inventory = new Mongo.Collection('Inventory');

Inventory.schema = new SimpleSchema({
	_id: {
    	type: String,
    	regEx: SimpleSchema.RegEx.Id,
		optional: true
  	},
	createdAt: {
        type: Date,
        autoValue: function() {
            return new Date();
        },
        denyUpdate: true,
		optional: true
    },
	sku: {
		type: String,
		max: 50,
	},
	description: {
		type: String,
		max: 500,
	},
	rrp: {
		type: Number,
	},
	wholesalePrice: {
		type: Number,
	},
	brand: {
		type: String,
		max: 200,
	},
	specifications: {
		type: [String],
		optional: true
	},
	tags: {
		type: [String],
		optional: true
	},
});

Inventory.attachSchema(Inventory.schema);

Inventory.publicFields = {
	sku: 1,
	description: 1,
	rrp: 1,
	wholesalePrice: 1,
	purchaseDate: 1,
	brand: 1,
	specifications: 1,
	tags: 1
};

export const insertInventory = new ValidatedMethod({
	name: 'inventory.insert',
	validate: Inventory.schema.validator(),
	run(fields) {
		Inventory.insert(fields);
	}
});

export const deleteInventory = new ValidatedMethod({
	name: 'inventory.delete',
	validate: function(){},
	run(fields) {
		Inventory.remove(fields);
	}
});

export const updateInventory = new ValidatedMethod({
	name: 'inventory.update',
	validate: Inventory.schema.validator(),
	run(fields) {
		return Inventory.upsert(
			fields,
			{$set: fields }
		);
	}
});

//Publications
if (Meteor.isServer) {
    Meteor.publish('inventory.getAll', function() {
      return Inventory.find({});
    });
}
