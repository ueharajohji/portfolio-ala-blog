$(document).ready(function (){

var $carousel = $('#carouselMain');


//initialize carousel

$carousel.carousel();

var $firstAnimatingElems =$carousel.find('.item:first').find('[data-animation ^= "animated"]');

doAnimations($firstAnimatingElems);

$carousel.carousel('pause');

$carousel.on('slide.bs.carousel', function(){


var $firstAnimatingElems =$carousel.find('.item:first').find('[data-animation ^= "animated"]');

doAnimations($firstAnimatingElems);


});

$("#slide1Alert1").hide();
//$("#slide1Alert1").show();
});


function showAlert(elems){
var id = elems.replace('B','');

//remove button
var hideFlag = $('#'+id).is(":hidden");
if(hideFlag==true)
$('#'+id).show();
else
$('#'+id).hide();
//$('#slide1alert1').hide();

}

function doAnimations(elems){

var animEndEv = 'webkitAnimationEnd animationend';

elems.each(function(){
var $this =$(this),
    $animationType =$this.data('animation');

    $this.addClass($animationType).one(animEndEv, function(){
    $this.removeClass($animationType);
    });

});

}
