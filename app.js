var userCredential = 0; //0=user 1=johji/管理者
var currLocale = "日本語";
var posts;
var testVar = "testing";

var busboy = require('connect-busboy');

var express = require('express');

var ejs = require('ejs');
var fs = require('fs');
var q = require('q');
var bodyParser = require('body-parser');
var multer = require('multer');
var fieldLocale = require('./controller/locale.js');
var smtp = require('./controller/smtp.js');
var Sequelize = require('./model/db_Model.js');

var path = require('path');
var app = express();
/*bb.extend(app);*/
//app.use(express.static(path.resolve('../public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(busboy()); 
app.set('views',path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.post('/file-upload', function(req, res) {
    var fstream;
    req.pipe(req.busboy);
    req.busboy.on('file', function (fieldname, file, filename) {
        console.log("Uploading: " + filename); 
        console.log('second TEST: ' +JSON.stringify(file));
 
        fstream = fs.createWriteStream(__dirname + '/files/' + filename);
        console.log("testing 3 "+JSON.stringify(fstream));
        file.pipe(fstream);
        fstream.on('close', function () {
            res.redirect('back');
        });
    });
});

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
  var username = "ueharajohji";//アクセスできるのは管理者のみです。
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

app.post('/savePost',function(req,res){
  //j.u 2016/06/12 削除機能
  var post = req.body.post;
  console.log("posting  :"+post);
  //追加
  Sequelize.addPost(post);
  //返す値
  res.writeHead(200, {'content-type': 'text/json' });
  res.write( JSON.stringify({ message : "successfuly added"}) );
  //ログイン状態を維持もしくはユーザー情報を残す
  userCredential=1;
  console.log("added going back :");
  res.end('\n');

});

app.post('/deletePost',function(req,res){
  //j.u 2016/06/11 削除機能
  var postid = req.body.postid;
  console.log("Deletedingpostid2 :"+postid);
  //削除
  Sequelize.deletePost(postid);
  //返す値
  res.writeHead(200, {'content-type': 'text/json' });
  res.write( JSON.stringify({ message : "successfuly deleted"}) );
  //ログイン状態を維持もしくはユーザー情報を残す
  userCredential=1;
  console.log("Deleted going back :");
  res.end('\n');

});


app.post('/logout',function(req,res){

  userCredential = 0;
  res.end('\n');
});

app.get('/article/:id', function(req , res){
  fieldLocale.setLocale(currLocale);
  
console.log("succesfully called controller");
//j.u WallをDBから取得
 Sequelize.getPost(req.params.id,function(err,results){
    if(err)
      throw err;
    else{
     
      //console.log(""+results.username+" and " +results.password+" exist");
      if(results)
      {
      
      console.log(results.post);
      res.render('article', {
        
        testVar: fieldLocale,
        wallPosts: results,
        userCredential:userCredential
      });
      
      }
      res.end('\n');
    }

  });
});

app.get('/newPost', function(req , res){
  fieldLocale.setLocale(currLocale);
  
console.log("succesfully startPosting controller");
//render newPost screen
   res.render('article', {
        
        testVar: fieldLocale,
        wallPosts: null,
        userCredential:userCredential
      });

});

app.get('/article/as', function(req,res){

//Sequelize.sequelize.sync();
//Sequelize.sequelize.sync({force:true});
//add delete ok
//Sequelize.addPost("this is");
//Sequelize.deletePost(3);
//Sequelize.getAllPost();
fieldLocale.setLocale(currLocale);
console.log(path.join(__dirname, 'public')+"css/bootstrap.min.css");
//j.u WallをDBから取得
 Sequelize.getAllPost(function(err, results) {
    if (err)
      throw err; 
    else
      {

        posts = results;
         res.render('home', {
        
        testVar: fieldLocale,
        wallPosts: posts,
        userCredential:userCredential
      });
      }
    
  });


});



app.get('/', function(req,res){
 console.log(path.join(__dirname, 'public')+"css/bootstrap.min.css");
//Sequelize.sequelize.sync();
//Sequelize.sequelize.sync({force:true});
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

         res.render('home', {
        
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
