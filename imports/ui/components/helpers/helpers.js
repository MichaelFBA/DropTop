import { Tags } from '/imports/api/tags/tags.js';
import { Template } from 'meteor/templating';

Template.registerHelper( 'getTagName', (id) => {
    console.log(id);
    let tag = Tags.findOne({_id: id});
    console.log(tag)
    if ( tag ) {
        return tag.tag;
    }
});
