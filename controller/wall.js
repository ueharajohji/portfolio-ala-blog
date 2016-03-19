//wall j.uehara 2013-03-19
//db access
var db = require('./../model/db.js');

var simple = function() {

	console.log("simple");
}

exports.findAllContinents = function(cb) {
  
  db.query('SELECT * FROM wallpost', function (err, rows, fields) {
    // close connection first
  
    // done: call callback with results
    cb(err, rows);
  });
};


var getWall = function (cb) {


	db.query('SELECT * FROM wallpost ORDER BY dateTime desc', function(err, rows, fields) {
 	 if (err){ return cb(err)};

 	
 	cb(err, rows);
 	

});

};
	

var connectToDB = function() {



db.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + db.threadId);
});

} 

exports.simple = simple;
exports.connect = connectToDB;
exports.getWall = getWall;