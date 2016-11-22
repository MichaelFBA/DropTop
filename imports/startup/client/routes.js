import {
	FlowRouter
} from 'meteor/kadira:flow-router';
import {
	BlazeLayout
} from 'meteor/kadira:blaze-layout';
import {
	ProfileTags
} from '/imports/ui/components/profileTags/profileTags.js';

import 'bootstrap';

//Layouts
import '../../ui/layouts/header/header.js';
import '../../ui/layouts/footer/footer.js';

//Pages
import '../../ui/pages/home/home.js';
import '../../ui/pages/admin/admin.js';
import '../../ui/pages/questionnaire/questionnaire.js';
import '../../ui/pages/newQuestionnaire/newQuestionnaire.js';
import '../../ui/pages/profile/profile.js';
import '../../ui/pages/checkout/checkout.js';

//Components
import '../../ui/components/helpers/helpers.js';
import '../../ui/components/tags/tags.js';
import '../../ui/components/specifications/specifications.js';
import '../../ui/components/inventory/inventory.js';
import '../../ui/components/questions/questions.js';
import '../../ui/components/profileTags/profileTags.js';
import '../../ui/components/select/select.js';
import '../../ui/components/checkbox/checkbox.js';

BlazeLayout.setRoot('body');


//Admin routes
var exposed = FlowRouter.group({
	prefix: "/admin",
	name: "admin"
});


//Login and Sign up groups
exposed.route('/login', {
	name: 'login',
	action: function() {
		BlazeLayout.render('auth', {
			content: 'login'
		});
	}
});

exposed.route('/signup', {
	name: 'signup',
	action: function() {
		BlazeLayout.render('auth', {
			content: 'signup'
		});
	}
});

//Logged in Group
loggedIn = FlowRouter.group({
	triggersEnter: [function(context, redirect) {
		const route = FlowRouter.current();
		if (Meteor.userId()) {
		} else if (route.route.name == 'login') {
			Session.set('redirectAfterLogin', route.path);
		} else {
			FlowRouter.go('login');
		}
	}]
});

//Home
FlowRouter.route('/', {
	action: function(params, queryParams) {
		BlazeLayout.render('main', {
			header: "header",
			content: "home",
			footer: "footer",
		});
	}
});

FlowRouter.route('/questionnaire/new', {
	action: function(params, queryParams) {
		BlazeLayout.render('main', {
			content: "newQuestionnaire",
		});
	}
});

FlowRouter.route('/questionnaire/:id', {
	action: function(params, queryParams) {
		BlazeLayout.render('main', {
			content: "questionnaire",
		});
	}
});

FlowRouter.route('/profile', {
	triggersEnter: [checkProfile],
	action: function(params, queryParams) {
		BlazeLayout.render('main', {
			content: "profile",
		});
	}
});

FlowRouter.route('/checkout', {
	action: function(params, queryParams) {
		BlazeLayout.render('main', {
			content: "checkout",
		});
	}
});

function checkProfile(context) {
	// context is the output of `FlowRouter.current()`
	const tags = ProfileTags.get();
	if (tags.length === 0) {
		BlazeLayout.render('notFound');
	}
}

//Admin
loggedIn.route('/admin', {
	action: function(params, queryParams) {
		BlazeLayout.render('main', {
			header: "header",
			content: "admin",
			footer: "footer",
		});
	}
});

//404
FlowRouter.notFound = {
	action: function() {
		BlazeLayout.render('notFound');
	}
};
