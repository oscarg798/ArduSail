/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.bootstrap.html
 */
var five = require("johnny-five");
module.exports.bootstrap = function(cb) {

    // It's very important to trigger this callback method when you are finished
    // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
    cb();

    // or "./lib/johnny-five" when running from the source
    sails.board = new five.Board();
    sails.five = five;
    sails.board.on("ready", function() {

        // Create an Led on pin 13 and strobe it on/off
        // Optionally set the speed; defaults to 100ms
        //(new five.Led(13)).strobe();
        sails.motor = new sails.five.Motor({
            pin: 5
        });

        sails.board.repl.inject({
            motor: sails.motor
        });

       sails.motor.on("start", function(err, timestamp) {
            console.log("start", timestamp);

            // Demonstrate motor stop in 2 seconds
            sails.board.wait(5000, function() {
                sails.motor.stop();
            });
        });

        sails.motor.on("stop", function(err, timestamp) {
            console.log("stop", timestamp);
        });

    });
};