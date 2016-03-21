//wall j.uehara 2013-03-19
//db access
var db = require('./../model/db.js');

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
	


exports.getWall = getWall;