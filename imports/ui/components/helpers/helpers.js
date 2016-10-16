import { Tags } from '/imports/api/tags/tags.js';
import { Answers } from '/imports/api/answers/answers.js';
import { Questions } from '/imports/api/questions/questions.js';
import { Specifications } from '/imports/api/specifications/specifications.js';
import { Template } from 'meteor/templating';

Template.registerHelper( 'getTagName', (id) => {
    let tag = Tags.findOne({_id: id});
    if ( tag ) {
        return tag.tag;
    }
});

Template.registerHelper( 'getAnswer', (id) => {
    let answer = Answers.findOne({_id: id});
    if ( answer ) {
        return answer.answer;
    }
});

Template.registerHelper( 'getQuestion', (id) => {
    let question = Questions.findOne({_id: id});
    if ( question ) {
        return question.question;
    }
});

Template.registerHelper( 'getSpecificationsName', (id) => {
    let spec = Specifications.findOne({_id: id});
    if ( spec ) {
        return spec.value;
    }
});

Template.registerHelper( 'capitalize', (words) => {
    return words ? words.charAt(0).toUpperCase() + words.slice(1) : '';
});

Template.registerHelper( 'parseInt', (string) => {
    return parseInt(string);
});
