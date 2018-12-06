const seleniumServer = require('selenium-server');
const chromedriver = require('chromedriver');


// we use a nightwatch.conf.BASIC.js file so we can include comments and helper functions
module.exports = {
    'src_folders': [
        'uitesting/tests', // Where you are storing your Nightwatch e2e uitesting
    ],
    'output_folder': 'uitesting/reports', // reports (uitesting outcome) output by nightwatch
    'custom_commands_path': 'uitesting/drivercode/CustomCommand',
    'selenium': {
        'start_process': true, // tells nightwatch to start/stop the selenium process
        'server_path': seleniumServer.path,
        'host': '127.0.0.1',
        'port': 4444, // standard selenium port
        'cli_args': {
            'webdriver.chrome.driver': chromedriver.path,
        },
    },
    'test_settings': {
        'default': {
            'screenshots': {
                'enabled': true, // if you want to keep screenshots
                'path': 'uitesting/screenshots', // save screenshots here
            },
            'globals': {
                'waitForConditionTimeout': 5000, // sometimes internet is slow so wait.
            },
            'desiredCapabilities': { // use Chrome as the default browser for uitesting
                'browserName': 'chrome',
            },
        },
        'chrome': {
            'desiredCapabilities': {
                'browserName': 'chrome',
                'javascriptEnabled': true, // turn off to uitesting progressive enhancement
            },
        },
    },
};