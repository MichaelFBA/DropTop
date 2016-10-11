import { Tags } from '/imports/api/tags/tags.js';
import { Answers } from '/imports/api/answers/answers.js';
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

Template.registerHelper( 'getSpecificationsName', (id) => {
    let spec = Specifications.findOne({_id: id});
    if ( spec ) {
        return spec.value;
    }
});
