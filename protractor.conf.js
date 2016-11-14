module.exports.config = {
  //seleniumAddress: 'http://localhost:4444/wd/hub',

  specs: [
    'check_tickets.js'
  ],
  
  framework: 'jasmine2',

  jasmineNodeOpts: {
    showColors: true, // use colors in the command line report
    //defaultTimeoutInterval: 30000,

    //print: function() {}
  },

  capabilities: {
    'browserName': 'chrome',
    'chromeOptions': {
        'args': ['show-fps-counter=true']
    }
  },

  onPrepare: function() {

    // var SpecReporter = require('jasmine-spec-reporter');
    // // add jasmine spec reporter
    // jasmine.getEnv().addReporter(new SpecReporter({displayStacktrace: 'all'}));
    browser.ignoreSynchronization = true;

    browser.driver.manage().window().maximize();

  }



};

