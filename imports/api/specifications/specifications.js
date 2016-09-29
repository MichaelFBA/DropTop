import { Mongo } from 'meteor/mongo';
import { Random } from 'meteor/random';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

export const Specifications = new Mongo.Collection('Specifications');

Specifications.schema = new SimpleSchema({
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

Specifications.attachSchema(Specifications.schema);

Specifications.publicFields = { type: 1, value: 1 };

export const insertSpec = new ValidatedMethod({
	name: 'specifications.insert',
	validate: Specifications.schema.validator(),
	run(fields) {
		// if (!this.userId) {
		//   throw new Meteor.Error('unauthorized', 'You must be logged in to add a new movie!')
		// }
		Specifications.insert(fields);
	}
});

export const deleteSpec = new ValidatedMethod({
	name: 'specifications.delete',
	validate: function(){

	},
	run(fields) {
		Specifications.remove(fields);
	}
});

//Publications
if (Meteor.isServer) {
    Meteor.publish('specifications.getAll', function() {
      return Specifications.find({});
    });
}
