module.exports = function() {

  var notification = require('cron').CronJob;
  new notification('0 0 */1 * * *', function(){
    // TODO
  }, null, true, 'Europe/Bratislava');

  var routes = require('../routes');
  var clenup = require('cron').CronJob;
  new clenup('0 0 */1 * * *', function(){
    routes.clearTmp();
  }, null, true, 'Europe/Bratislava');
};