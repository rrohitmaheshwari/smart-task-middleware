let config = require('../drivercode/nightwatch.conf.BASIC.js');
let testConfig = require('../drivercode/testConfig.json');

/*
Command:
    npm run nightwatch --test uitesting/tests/1_Login.js
*/
module.exports = {
    'User Login': function (browser) {
        browser
            .login(testConfig.username, testConfig.password)
            .logout()
            .end();
    },
};