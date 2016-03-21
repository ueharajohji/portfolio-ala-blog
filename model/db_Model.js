var Sequelize = require('sequelize');

var sequelize = new Sequelize('webresume','root','uehara98',
{
	host: 'localhost', 
	port: '3307',
	dialect: 'mysql',
	pool: {
		max: 5,
		min: 0,
		idle: 10000
	},

});
//******j.u*****MODEL****************//
var post_t = sequelize.define('post_t',{

	post: Sequelize.STRING

});
var user = sequelize.define('user',{

	username: {
		 type: Sequelize.STRING,
    	 primaryKey: true
	},
	password: Sequelize.STRING,
	credential: Sequelize.INTEGER

});
//***********MODEL***************//

//*****j.u****QUERIES***************//
var addPost = function (post) {


	post_t.create({ post: post }).then(function (task){

		//console.log(task);
		task.save();
		//console.log("succesfuly inserted");

	});
 	
};

var deletePost = function (postid) {


	post_t.destroy({ where: {id : postid} });
 	
};

var getAllPost = function (callback){

	post_t.findAll({

		attributes : [

		'id',
		'post',
		'createdAt'

		]
		}).nodeify(callback);


};

var checkPassword = function (username,password,callback){

	user.find({

		where: {

			username:username,
			password:password

		}

	}).nodeify(callback);


};

exports.sequelize = sequelize;
exports.addPost = addPost;
exports.deletePost = deletePost;
exports.getAllPost = getAllPost;
exports.checkPassword = checkPassword;