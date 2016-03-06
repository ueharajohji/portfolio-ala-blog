
var currLocale = "日本語";

var testVar = "testing";
var express = require('express');
var ejs = require('ejs');
var fs = require('fs');
var bodyParser = require('body-parser');
var multer = require('multer');
var fieldLocale = require('./locale.js');
var path = require('path');
var app = express();
app.use(express.static(path.resolve('../public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('views',path.join(path.resolve('../'), 'views'));
app.set('view engine', 'ejs');
//app.use(multer());

app.post('/changeLang', function(req, res) {
  //get lang
  currLocale=req.body.local;
  
  console.log(fieldLocale.translate("About"));
    console.log("language change to " + currLocale + " right?");

  res.redirect('/');

});


app.get('/', function(req,res){

fieldLocale.setLocale(currLocale);

  res.render('pages/home', {
        
        testVar: fieldLocale
    });
});

/*app.get('/', function(request, response){
   
console.log(bodyParser);
fieldLocale.setLocale(currLocale);
console.log(fieldLocale.translate("Welcome"));


fs.readFile(path.resolve('../home.html'), 'utf-8', function(err, content) {
    if (err) {
      response.end('error occurred');
      return;
    }
    var temp = 'some temp';  

    var renderedHtml = ejs.render(content, {testVar: fieldLocale});  
    response.write(renderedHtml);
    response.end();

  });

});
*/


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
