
var currLocale = "日本語";
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
var smtp = require('./smtp.js');

var path = require('path');
var app = express();
app.use(express.static(path.resolve('../public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('views',path.join(path.resolve('../'), 'views'));
app.set('view engine', 'ejs');



app.post('/changeLang', function(req, res) {
  //j.u fixed 言語切り替え
  currLocale=req.body.local;
  res.redirect('/');

});

app.post('/sendMail', function(req, res) {
  //j.u mailgunの為のコード
  smtp.userMail.text = req.body.mailerText;
  smtp.userMail.subject = req.body.mailerSubject;
  smtp.thanksNotif.to = req.body.mailerFrom;
  smtp.sendMail(smtp.userMail,smtp.thanksNotif);
  res.writeHead(200, {'content-type': 'text/json' });
  res.write( JSON.stringify({ thanks : "Thanks " + req.body.mailerFrom}) );
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
