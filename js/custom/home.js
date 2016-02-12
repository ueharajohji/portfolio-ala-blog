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

});


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
