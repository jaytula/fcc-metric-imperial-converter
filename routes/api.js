/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var expect = require('chai').expect;
var ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  var convertHandler = new ConvertHandler();

  app.route('/api/convert')
    .get(function (req, res){
      try {
        var input = req.query.input;
        var initNum = convertHandler.getNum(input);
        var initUnit = convertHandler.getUnit(input);
        var returnNum = convertHandler.convert(initNum, initUnit);
        var returnUnit = convertHandler.getReturnUnit(initUnit);
        var string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

        //res.json
        res.json({
          initNum,
          initUnit,
          returnNum,
          returnUnit,
          string
        })
      } catch(err) {
        res.status(400).send(err.message)
      }
    });
    
};