import { Meteor } from 'meteor/meteor';
import Sugar from 'sugar';
import { updateSpec } from '/imports/api/specifications/specifications.js';

//Api
import '/imports/api/tags/tags.js';
import '/imports/api/specifications/specifications.js';
import '/imports/api/inventory/inventory.js';

// code to run on server at startup
Meteor.startup(() => {
    //Fixtures
    var LaptopFixture = JSON.parse(Assets.getText('fixtures/laptops.json'));

    Sugar.Object.forEach(LaptopFixture, function(val){
        Sugar.Object.forEach(val, function(val, key){
            const data = {
                type: key,
                value : val.toString()
            };
            updateSpec.call(data);
        })
    })
});
