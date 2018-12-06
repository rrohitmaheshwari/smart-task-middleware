let testConfig = require('../../drivercode/testConfig.json');

exports.command = function (username, password) {
    this
        .url(testConfig.url)
        .pause(1000)
        .waitForElementVisible('body', 'Navigate to Login Page')
        .assert.title('SmartTask', 'Login Page loaded successfully')
        .click('#header-signin-text')
        .pause(1000)
        .setValue('input[name="email"]', username)
        .setValue('input[name="password"]', password)
        .click('#signIn')
        .pause(1000)
        .waitForElementVisible('button[class="add-task-button"]', 'Home Page Loaded Successfully!')
    return this;
};