let config = require('../drivercode/nightwatch.conf.BASIC.js');
let testConfig = require('../drivercode/testConfig.json');

/*
Command:
    npm run nightwatch --test uitesting/tests/3_UpdateProfile.js
*/
module.exports = {
    'User Login': function (browser) {
        browser
            .login(testConfig.username, testConfig.password)
            .url(testConfig.url + '/userhome/userprofile')
            .waitForElementVisible('button[class="userprofile-buttons"]', 'View Profile Page Loaded Successfully!')
            .pause(2000)
            .click('button[class="userprofile-buttons"]')
            .pause(2000)
            .waitForElementVisible('input[class="userprofile-inputs-modal"]', 'Edit Profile Modal Pop up loaded Successfully!')
            .clearValue('input[name="phone"][class="userprofile-inputs-modal"]')
            .setValue('input[name="phone"][class="userprofile-inputs-modal"]', '6692928987')
            .click('#update-profile-button')
            .logout()
            .end();
    },
};