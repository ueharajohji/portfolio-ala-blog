$(document).ready(function (){


$('#savePost').click(function(){

savePost();


});





});

function savePost()
{
	$.ajax({
        type: 'POST',
        url: 'http://localhost:3000/savePost',
        data: {
        	post:$('#postEntry').val()
        },
        success: function (dataCheck) {
          
        
        alert(dataCheck.message); 
        location.reload();     
        }
    });
}
