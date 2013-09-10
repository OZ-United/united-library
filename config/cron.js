module.exports = function() {
  var routes = require('../routes');

  var reminders = require('cron').CronJob;
  new reminders('0 0 17 * * *', function(){
    routes.sendReminders();
  }, null, true, 'Europe/Bratislava');

  var tickets = require('cron').CronJob;
  new tickets('0 0 16 * * *', function(){
    routes.sendTickets();
  }, null, true, 'Europe/Bratislava');

  var clenup = require('cron').CronJob;
  new clenup('0 0 */1 * * *', function(){
    routes.clearTmp();
  }, null, true, 'Europe/Bratislava');
};