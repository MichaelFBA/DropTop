import { Mongo } from 'meteor/mongo';
import { Random } from 'meteor/random';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

export const Tags = new Mongo.Collection('Tags');

Tags.schema = new SimpleSchema({
	_id: {
    	type: String,
    	regEx: SimpleSchema.RegEx.Id,
		optional: true
  	},
	tag: {
		type: String,
		max: 200,
	}
});

Tags.attachSchema(Tags.schema);

Tags.publicFields = { tag: 1 };

export const insertTag = new ValidatedMethod({
	name: 'tags.insert',
	validate: Tags.schema.validator(),
	run(fields) {
		// if (!this.userId) {
		//   throw new Meteor.Error('unauthorized', 'You must be logged in to add a new movie!')
		// }
		Tags.insert(fields);
	}
});

export const deleteTag = new ValidatedMethod({
	name: 'tags.delete',
	validate: function(){

	},
	run(fields) {
		Tags.remove(fields);
	}
});

//Publications
if (Meteor.isServer) {

    Meteor.publish('tags.getAll', function() {
      return Tags.find({});
    });

}
