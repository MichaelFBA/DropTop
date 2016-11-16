import { Mongo } from 'meteor/mongo';

export const Survey = new Mongo.Collection('Survey');

//Publications
if (Meteor.isServer) {

	Meteor.publish('survey.getAll', function() {
      return Survey.find({});
    });

	Meteor.publish('survey.getByType', function(type) {
      return Survey.find({type: type});
	  return this.ready();
    });

	Meteor.publish('survey.getById', function(id) {
      return Survey.find({_id: id});
    });

	Meteor.methods({
		updateSurvey: function(survey) {
		  	return Survey.upsert(
				{ _id: survey._id },
	  			{ $set :  survey }
	  		);
	  	}
	});
}
