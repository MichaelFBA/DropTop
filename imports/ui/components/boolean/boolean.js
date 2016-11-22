import {
	Template
} from 'meteor/templating';
import {
	Navigator
} from '/imports/api/navigator/navigator.js';
import {
	ProfileTags
} from '/imports/ui/components/profileTags/profileTags.js';
import Sugar from 'sugar';
import './boolean.html';



Template.boolean.events({
	'click button': function(event, template) {
		console.log('howdy', event)
	}
});
