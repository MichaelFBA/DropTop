import { Mongo } from 'meteor/mongo';
import { Random } from 'meteor/random';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

export const Answers = new Mongo.Collection('Answers');

Answers.schema = new SimpleSchema({
	_id: {
    	type: String,
    	regEx: SimpleSchema.RegEx.Id,
		optional: true
  	},
	answer: {
		type: String,
		max: 1000,
	},
});

Answers.attachSchema(Answers.schema);

Answers.publicFields = {
	answer: 1
};

export const insertAnswer = new ValidatedMethod({
	name: 'answer.insert',
	validate: Answers.schema.validator(),
	run(fields) {
		return Answers.insert(fields);
	}
});

export const deleteAnswer = new ValidatedMethod({
	name: 'answer.delete',
	validate: function(){},
	run(fields) {
		return Answers.remove(fields);
	}
});


//Publications
if (Meteor.isServer) {
    Meteor.publish('answers.getAll', function() {
      return Answers.find({});
    });
}
