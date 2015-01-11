/**
 * ControlController
 *
 * @description :: Server-side logic for managing controls
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    new: function(req, res, next) {

        res.view();
    },
    execute: function(req, res, next) {
        var motor = req.param('motor');
        console.log('motor: '+ motor);
        if (motor == 'on') {
        	sails.motor.start(150);

        }
    }

};