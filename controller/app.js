
var currLocale = "日本語";

var apikey= "key-3b3ace18c50cace29887779f88ef4d35";
var domain = "johjiiiiu.com";
var posts;
var testVar = "testing";
var express = require('express');
var ejs = require('ejs');
var fs = require('fs');
var q = require('q');
var bodyParser = require('body-parser');
var multer = require('multer');
var fieldLocale = require('./locale.js');
var wallPosts = require('./wall.js');

var path = require('path');
var app = express();
app.use(express.static(path.resolve('../public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('views',path.join(path.resolve('../'), 'views'));
app.set('view engine', 'ejs');
//basic smtp
var mailgun = require('mailgun-js')({apiKey: apikey, domain: domain});
var userMail = {
  from: 'Uehara Johji <ueharajohji@johjiiiiu.com>',
  to: 'ueharajohji@gmail.com ,ueharajohji@johjiiiiu.com',
  subject: 'A message from your visitor ;)',
  text: ''
};

var thanksNotif = {
  from: 'Uehara Johji <ueharajohji@johjiiiiu.com>',
  to: '',
  subject: '[No-REPLY] ---Johji----',
  text: 'Thanks for your message , I will get reply as soon as I read your e-mail. This message is generated automatically. '
};


app.post('/changeLang', function(req, res) {
  //j.u fixed 言語切り替え
  currLocale=req.body.local;
  res.redirect('/');

});

app.post('/sendMail', function(req, res) {
  //j.u mailgunの為のコード

  //send to me
  mailerSubject=req.body.mailerSubject;
  mailerFrom=req.body.mailerFrom;
  mailerText=req.body.mailerText;
  mailerName = req.body.mailerName;
  console.log(mailerSubject);

  userMail.subject = mailerSubject;
  userMail.text = mailerText; 
  mailgun.messages().send(userMail, function (error, body) {
  console.log(body);
  });
  //send thanks
  thanksNotif.to =mailerFrom;
  mailgun.messages().send(thanksNotif, function (error, body) {
  console.log(body);
  });

  //end
  res.writeHead(200, {'content-type': 'text/json' });
  res.write( JSON.stringify({ thanks : "Thanks " + mailerFrom}) );
  res.end('\n');

});

app.get('/', function(req,res){

fieldLocale.setLocale(currLocale);

changeResponse().then(function(posts){
    console.log(posts);
    res.render('pages/home', {
        
        testVar: fieldLocale,
        wallPosts: posts
    });

})

function changeResponse ()
{
 var deferred = q.defer();
 wallPosts.getWall(function(err, results) {
    if (err)
      throw err; 
    else
      {
        posts = results;
        deferred.resolve(posts);
      }
    
  });
 return deferred.promise;
}
  
});


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
