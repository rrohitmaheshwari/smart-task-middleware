
exports.command = function() {
    this
        .click('#header-home-logout')
        .pause(1000)
        .waitForElementVisible('div[class="Homepage"]', 'Logged out Successfully!')
    return this;
};