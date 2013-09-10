var nodemailer = require('nodemailer');
module.exports.config = {};

module.exports.setConfig = function(config){
  module.exports.config = config;
  console.log(module.exports.config);
};

var renderRent = function(rent){
  var text = '';
  text += 'Požičanie knihy ' + renderSubject(rent) + '.';
  text += '\n';
  text += '\n';
  text += 'Používateľ: ' + rent.user.name;
  text += '\n';
  text += 'Požičané od: ' + rent.rent.startDate;
  text += '\n';
  text += 'Požičané do: ' + rent.rent.endDate;

  return text;
};

var renderReturn = function(rent){
  var text = '';
  text += 'Vrátenie knihy ' + renderSubject(rent) + '.';
  text += '\n';
  text += '\n';
  text += 'Používateľ: ' + rent.user.name;
  text += '\n';
  text += 'Požičané od: ' + rent.rent.startDate;
  text += '\n';
  text += 'Požičané do: ' + rent.rent.endDate;
  text += '\n';
  text += 'Vrátené: ' + rent.rent.returnDate;

  return text;
};

var renderReminder = function(rent){
  var text = '';
  text += 'Pripomenutie vrátenia knihy ' + renderSubject(rent) + '.';
  text += '\n';
  text += '\n';
  text += 'Používateľ: ' + rent.user.name;
  text += '\n';
  text += 'Požičané od: ' + rent.rent.startDate;
  text += '\n';
  text += 'Požičané do: ' + rent.rent.endDate;

  return text;
};

var renderTicket = function(rent){
  var text = '';
  text += 'Upemienka nevrátenej knihy ' + renderSubject(rent) + '.';
  text += '\n';
  text += '\n';
  text += 'Používateľ: ' + rent.user.name;
  text += '\n';
  text += 'Požičané od: ' + rent.rent.startDate;
  text += '\n';
  text += 'Požičané do: ' + rent.rent.endDate;

  return text;
};

var renderSubject = function(rent){
  return rent.book.title + ' (' + rent.book.author + ')';
};

var send = function(rent, type, r){

   if (r > 100) {
    return false;
  }

  var smtpTransport = nodemailer.createTransport('SMTP',{
    service: 'Gmail',
    auth: {
      user: module.exports.config.email.address,
      pass: module.exports.config.email.password
    }
  });

  var text = '';
  if (type === 'rent') {
    text = renderRent(rent);
  }
  else if (type === 'return') {
    text = renderReturn(rent);
  }
  else if (type === 'reminder') {
    text = renderReminder(rent);
  }
  else if (type === 'ticket') {
    text = renderTicket(rent);
  }

  var mailOptions = {
    from: 'OZ UNITED Knižnica <' + module.exports.config.email.address + '>',
    to: (rent.user.name || '') + ' <' + rent.user.email + '>',
    bcc: module.exports.config.email.address,
    subject: renderSubject(rent),
    text: text
  };

  console.log(mailOptions);

  smtpTransport.sendMail(mailOptions, function(error, response){
    smtpTransport.close();

    if (error){
        console.log(error);
        setTimeout(function(){
          sendEmail(rent, type, r+1);
        }, 60000);
    }
    else{
        console.log('Message sent: ' + response.message);
    }
  });

};

module.exports.rentBook = function(rent){
  send(rent, 'rent', 0);
};

module.exports.returnBook = function(rent){
  send(rent, 'return', 0);
};

module.exports.sendReminders = function(rents){
  rents.forEach(function(rent){
    send(rent, 'reminder', 0);
  });
};

module.exports.sendTickets = function(rents){
  rents.forEach(function(rent){
    send(rent, 'ticket', 0);
  });
};