//global is for themes , global functions , global variables , time and etc


var mailer = {

	from: "",
	to: "",
	text: "",
	subject:""

};

$(document).ready(function(){


$('#messageSent').hide();
shortcut.add("Ctrl+Shift+Alt+J",function() {
	$('#admin').modal('toggle');
    $("#password").focus();
});

});

function getWall(){

$.ajax({
        type: 'POST',
        url: 'http://localhost:3000/getWall',
        success: function (data) {
          
        }
    });



}

//mailgunのAPI呼び出す
function sendMail(){

mailer.name = document.getElementById("namefield").value;
mailer.from = document.getElementById("emailfield").value;
mailer.subject ="message from " 
				+ document.getElementById("namefield").value 
				+ "("+document.getElementById("emailfield").value+")";
mailer.text = document.getElementById("textfield").value;

	$.ajax({
        type: 'POST',
        url: 'http://localhost:3000/sendMail',
        data: {
        	mailerName:mailer.name,
        	mailerFrom:mailer.from,
        	mailerSubject:mailer.subject,
        	mailerText:mailer.text
        },
        success: function (dataCheck) {
          
              clearFields();
              $('#messageSent').show();
			  $("#messageSent").fadeTo(5000, 500).slideUp(500);
              
        }
    });

}

function login(){

var password = document.getElementById("password").value;
alert(password);
//check password if correct
	$.ajax({
        type: 'POST',
        url: 'http://localhost:3000/checkLogin',
        data: {
        	password:password
        },
        success: function (dataCheck) {
          
        
       
        location.reload();     
        }
    });

}

function logout() {
	$.ajax({
        type: 'POST',
        url: 'http://localhost:3000/logout',
        
        success: function (dataCheck) { 
        location.reload();     
        }
    });
}

function clearFields(){

	$('#namefield').val("");
	$('#textfield').val("");
	$('#emailfield').val("");

}

function changeLang(key){

//言語切り替えの為
	 $.ajax({
        type: 'POST',
        url: 'http://localhost:3000/changeLang',
        data: {
        	local:key
        },
        success: function (dataCheck) {
               
               location.reload();
        }
    });
}

function hovered(ins){
ins.src ="images/logo2.png";
}

function restore(ins){
ins.src ="images/logo.png";
}