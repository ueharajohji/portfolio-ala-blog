//basic smtp
var apikey= "key-3b3ace18c50cace29887779f88ef4d35";
var domain = "johjiiiiu.com";
var mailgun = require('mailgun-js')({apiKey: apikey, domain: domain});
var userMail = {
  from: 'Uehara Johji <ueharajohji@johjiiiiu.com>',
  to: 'ueharajohji@gmail.com ,ueharajohji@johjiiiiu.com',
  subject: 'A message from your visitor :)',
  text: ''
};

var thanksNotif = {
  from: 'Uehara Johji <ueharajohji@johjiiiiu.com>',
  to: '',
  subject: 'アドミニストレータからメッセージが届きました (上原 Johji)',
  text: 'メッセージありがとうございます！ , このメッセージを読み次第、お返事させていただきます。 このメッセージが自動で作成されました. ーウエハラ'
};

var sendMail = function(mail,thanks){


  mailgun.messages().send(mail, function (error, body) {
  console.log(body);
  });

  mailgun.messages().send(thanks, function (error, body) {
  console.log(body);
  });



}


exports.userMail = userMail;
exports.thanksNotif = thanksNotif;
exports.sendMail = sendMail;
