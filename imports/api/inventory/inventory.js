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
	type: {
		type: String,
		max: 200,
	},
	value: {
		type: String,
		max: 200,
	},
});

Inventory.attachSchema(Inventory.schema);

Inventory.publicFields = { type: 1, value: 1 };

export const insertSpec = new ValidatedMethod({
	name: 'inventory.insert',
	validate: Inventory.schema.validator(),
	run(fields) {
		// if (!this.userId) {
		//   throw new Meteor.Error('unauthorized', 'You must be logged in to add a new movie!')
		// }
		Inventory.insert(fields);
	}
});

export const deleteSpec = new ValidatedMethod({
	name: 'inventory.delete',
	validate: function(){},
	run(fields) {
		Inventory.remove(fields);
	}
});

export const updateSpec = new ValidatedMethod({
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
