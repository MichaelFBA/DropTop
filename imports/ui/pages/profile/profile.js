import { Template } from 'meteor/templating';
import { Questions } from '/imports/api/questions/questions.js';
import { ReactiveVar } from 'meteor/reactive-var'
import './profile.html'

Template.profile.onCreated(function() {
    this.autorun(() => {
        this.subscribe('tags.getAll');
    });
});

Template.profile.events({
    "click #go-to-first-question": function(event, template){
        FlowRouter.go('/questionnaire/'+ Template.instance().firstQuestion.get());
    }
});
