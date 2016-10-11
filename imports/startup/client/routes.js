import {
	FlowRouter
} from 'meteor/kadira:flow-router';
import {
	BlazeLayout
} from 'meteor/kadira:blaze-layout';

import 'bootstrap';

//Layouts
import '../../ui/layouts/header/header.js';
import '../../ui/layouts/footer/footer.js';

//Pages
import '../../ui/pages/home/home.js';
import '../../ui/pages/admin/admin.js';
import '../../ui/pages/questionnaire/questionnaire.js';
import '../../ui/pages/newQuestionnaire/newQuestionnaire.js';

//Components
import '../../ui/components/helpers/helpers.js';
import '../../ui/components/tags/tags.js';
import '../../ui/components/specifications/specifications.js';
import '../../ui/components/inventory/inventory.js';
import '../../ui/components/questions/questions.js';

BlazeLayout.setRoot('body');

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

FlowRouter.route('/questionnaire/:questionId', {
	action: function(params, queryParams) {
		BlazeLayout.render('main', {
            // header: "header",
            content: "questionnaire",
            // footer: "footer",
        });
	}
});

//Blog
FlowRouter.route('/admin', {
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
