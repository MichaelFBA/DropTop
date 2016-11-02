import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
// import { Survey, insertSurvey, deleteSurvey } from '/imports/api/survey/survey.js';
import './survey.html';

Template.survey.onCreated(function() {
  this.autorun(() => {
    this.subscribe('survey.getAll');
  });
});


Template.survey.helpers({
    survey: function(){
        return Survey.find({});
    },
});

Template.survey.events({
    "submit .new-survey": function(event, template){
        event.preventDefault();

        const data = {
            tag: event.target.tag.value
        };

        insertSurvey.call(data, function(error, result){
            if(error){
                console.log("error", error);
            }
            if(result){
                console.log("result", result);
            }
        });
        event.target.tag.value = '';
    },
    "click .remove": function(event, template){

        const data = {
            _id: $(event.target).data('id')
        };

        deleteSurvey.call(data, function(error, result){
            if(error){
                console.log("error", error);
            }
            if(result){
                console.log("result", result);
            }
        });
    }
});
