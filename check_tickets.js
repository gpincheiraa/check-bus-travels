(function(){

  'use strict';

  describe('Revisando si hay pasajes disponibles.', checkTickets);

  function checkTickets(){


    var nodemailer = require('nodemailer'),
        fs = require('fs'),
        transporter = nodemailer.createTransport('smtps://@smtp.gmail.com'),

        emails_to_notify = [
          'gpincheiraa@gmail.com',
          'tamaraacevedoavila@gmail.com'
        ],

        travel_date = process.env['TRAVEL_DATE'],

        mailOptions = {
          from: '"CheckPasajes 👥" <checkpasajes@boolean.com>',
          
          to: emails_to_notify.join(','),
          
          subject: 'Buscando pasajes para el' + travel_date + ' desde Talca a Stgo ✔'
        };

    var PAGE_SELECTORS = {
      SELECT_ORIGIN: '#reservation-form #ori_ option[value="2"]', //Talca
      SELECT_DEST: '#reservation-form #des_ option[value="1"]', //Santiago
      TRAVEL_INPUT: '#reservation-form #fori',
      SUBMIT_BUTTON: '#reservation-form button[type="submit"]',
      RESULTS_NEGATIVE: '#piso1 .jumbotron span'
    };


    it('Buscar pasajes', spec1);

    function spec1(){
      
      var negative_result;


      browser.driver.get('http://www.venta.busesaltascumbres.cl/servicios');
      
      browser.driver.findElement(by.css(PAGE_SELECTORS.SELECT_ORIGIN)).click();
      browser.driver.findElement(by.css(PAGE_SELECTORS.SELECT_DEST)).click();
      browser.driver.findElement(by.css(PAGE_SELECTORS.TRAVEL_INPUT)).sendKeys(travel_date);
      
      browser.driver.findElement(by.css(PAGE_SELECTORS.SUBMIT_BUTTON)).click();


      browser.driver.sleep(2000);


      browser.driver.takeScreenshot().then(function(png) {

        // Do something with the png..
        fs.writeFile('check_tickets.png', png, 'base64', function(err){
            if (err) throw err
            console.log('File saved.')
        })
      });


      browser.driver.isElementPresent(by.css(PAGE_SELECTORS.RESULTS_NEGATIVE)).then(function(is_negative){
        
        if(is_negative){
          /*browser.driver.findElement(by.css(PAGE_SELECTORS.RESULTS_NEGATIVE)).getText().then(function(text){
            //send_notify(text);
          });*/
        }

        else{
          send_notify("Ya hay pasajes. Se adjunta una foto");
        }

      });
      
    }

    function send_notify(emailText){
      

      browser.driver.sleep(2000);

      fs.readFile("check_tickets.png", function (err, data) {
        
        mailOptions.html = '<b>' + emailText + '</b>';
        mailOptions.attachments = [
          {'filename': 'screenshoot.png', 'content': data}
        ];

        transporter.sendMail(mailOptions, function(error, info){
          if(error){
            return console.log(error);
          }
          console.log('Message sent: ' + info.response);
        });


      });

    }

  }

})();
