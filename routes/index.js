
/*
 * GET home page.
 */

var ejs = require('ejs');

exports.index = function(req, res){
  res.render('index');
};