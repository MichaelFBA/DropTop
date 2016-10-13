import { Meteor } from 'meteor/meteor';
import Sugar from 'sugar';
import { updateSpec } from '/imports/api/specifications/specifications.js';
import { updateAnswer } from '/imports/api/answers/answers.js';

//Api
import '/imports/api/tags/tags.js';
import '/imports/api/specifications/specifications.js';
import '/imports/api/inventory/inventory.js';
import '/imports/api/questions/questions.js';
import '/imports/api/answers/answers.js';

// code to run on server at startup
Meteor.startup(() => {
    //Fixtures
    var LaptopFixture = JSON.parse(Assets.getText('fixtures/laptops.json'));
    var AnswersFixture = JSON.parse(Assets.getText('fixtures/answers.json'));

    Sugar.Object.forEach(LaptopFixture, function(val){
        Sugar.Object.forEach(val, function(val, key){
            const data = {
                type: key,
                value : val.toString()
            };
            updateSpec.call(data);
        })
    })

    Sugar.Object.forEach(AnswersFixture, function(val){
        updateAnswer.call(val);
    });
});
