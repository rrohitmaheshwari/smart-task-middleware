let config = require('../drivercode/nightwatch.conf.BASIC.js');
let testConfig = require('../drivercode/testConfig.json');

/*
Command:
    npm run nightwatch --test uitesting/tests/2_SignUp.js
*/
let temp = Math.floor(Math.random() * Math.floor(1000));

module.exports = {
    'User Signup': function (browser) {
        browser
            .url(testConfig.url)
            .pause(1000)
            .waitForElementVisible('body', 'Navigated to SmartTask Site')
            .assert.title('SmartTask', 'Page loaded successfully')
            .click('#header-signup-text')
            .pause(1000)
            .setValue('input[name="firstname"]', 'test' + temp)
            .setValue('input[name="lastname"]', 'lname' + temp)
            .setValue('input[name="email"]', 'test' + temp + '@sjsu.edu')
            .setValue('input[name="password"]', 'Pass' + temp)
            .setValue('input[name="phone"]', '6662222111')
            .click('#signUp')
            .pause(1000)
            .waitForElementVisible('button[class="add-task-button"]', 'Signed up and Logged in Successfully!')
            .pause(2000)
            .logout()
            .end();
    },
};