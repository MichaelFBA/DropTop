import { Mongo } from 'meteor/mongo';
import { Random } from 'meteor/random';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

export const Questions = new Mongo.Collection('Questions');

const Answers = new SimpleSchema({
	tag: {
		type: String,
		max: 50,
	},
	answer: {
		type: String,
		max: 50,
	},
});

Questions.schema = new SimpleSchema({
	_id: {
    	type: String,
    	regEx: SimpleSchema.RegEx.Id,
		optional: true
  	},
	question: {
		type: String,
		max: 1000,
	},
	answers: {
		type: [Answers],
		optional: true
	},
	parentId: {
		type: String,
		optional: true
	}
});

Questions.attachSchema(Questions.schema);

Questions.publicFields = {
	question: 1,
	subQuestions: 1,
	answers: 1
};

export const insertQuestion = new ValidatedMethod({
	name: 'questions.insert',
	validate: Questions.schema.validator(),
	run(fields) {
		return Questions.insert(fields);
	}
});

export const deleteQuestion = new ValidatedMethod({
	name: 'questions.delete',
	validate: function(){},
	run(fields) {
		return Questions.remove(fields);
	}
});


//Publications
if (Meteor.isServer) {
    Meteor.publish('questions.getAll', function() {
      return Questions.find({});
    });
}
