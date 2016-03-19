//db j.uehara 2016/03/19

var mysql = require('mysql');

var connection = mysql.createConnection({
	host: 'localhost',
	port: '3307',
	user: 'root',
	password: 'uehara98',
	database: 'webresume'
}); 

module.exports = connection;


