//global is for themes , global functions , global variables , time and etc

$(function(){

$("#header").load("header.html");
$("#footer").load("footer.html", function(){
$('ul.nav > li > a[href="' + document.location.pathname.split("/")[document.location.pathname.split("/").length-1] + '"]').parent().addClass('active');
});


});

$(document).ready(function(){




});

function hovered(ins){
ins.src ="images/logo2.png";
}


function restore(ins){
ins.src ="images/logo.png";
}