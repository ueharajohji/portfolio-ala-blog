var userCredential = 0; //0=user 1=johji
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
var Sequelize = require('./../model/db_Model.js');

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

app.post('/checkLogin', function(req, res) {
  //j.u ログインチェック
  var username = "uehara";//アクセスできるのは管理者のみです。
  var password = req.body.password;
  console.log("checkpoint2 :"+password);
  //go get if correct
  Sequelize.checkPassword(username,password,function(err,results){
    if(err)
      throw err;
    else{
      
      //console.log(""+results.username+" and " +results.password+" exist");
      if(results)
      {
      
      userCredential=1;
      //res.redirect('/');
      res.writeHead(200, {'content-type': 'text/json' });
      res.write( JSON.stringify({ message : "login success"}) );
      
      }
      else
      {
      
      res.writeHead(200, {'content-type': 'text/json' });
      res.write( JSON.stringify({ message : "login failed"}) );
      
      }
      res.end('\n');
    }

  });

  
});

app.post('/logout',function(req,res){

  userCredential = 0;
  res.end('\n');
});

app.get('/', function(req,res){

Sequelize.sequelize.sync();
//add delete ok
//Sequelize.addPost("this is");
//Sequelize.deletePost(3);
//Sequelize.getAllPost();
fieldLocale.setLocale(currLocale);

//j.u WallをDBから取得
 Sequelize.getAllPost(function(err, results) {
    if (err)
      throw err; 
    else
      {

        posts = results;
         res.render('pages/home', {
        
        testVar: fieldLocale,
        wallPosts: posts,
        userCredential:userCredential
      });
      }
    
  });


});


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
