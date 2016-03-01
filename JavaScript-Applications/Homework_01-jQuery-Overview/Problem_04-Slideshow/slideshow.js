$(document).ready(function() {
	'use strict'
	
	var SLIDE_WIDTH = 1000,
		SLIDESHOW_INTERVAL = 3000,
		currPosition = 0,
		slides = $('.slideBox').wrapAll('<div id="slidesWrapper"></div>').css('float', 'left'),
		slidesCount = slides.length,
		moveLeftBtn = $('<span>').attr('id', 'leftBtn').text('<<<').prependTo('figcaption'),
		moveRightBtn = $('<span>').attr('id', 'rightBtn').text('>>>').prependTo('figcaption'),
		slideshowBtn = $('<span>').attr('id', 'slideshowBtn').text('Run slideshow').prependTo('#wrapper'),
		slideShowInterval;
		
	$('#slidesWrapper').css('width', SLIDE_WIDTH * slidesCount);
	hideButton(currPosition);
		
	// add eventListener on slideshow button, that activated slideshow
	slideshowBtn.on('click', function(){
		slideShowInterval = setInterval(findPosition, SLIDESHOW_INTERVAL);
	});
		
	// add eventListener on left button, that moves slide only by click on button
	moveLeftBtn.on('click', function(){
		slideShowInterval = clearInterval(slideShowInterval);
		
		if(currPosition > 0){
			currPosition = currPosition - 1;
		}
			
		hideButton(currPosition);
		action();
	});
		
	// add eventListener on right button, that moves slide only by click on button
	moveRightBtn.on('click', function(){
		slideShowInterval = clearInterval(slideShowInterval);
			
		if(currPosition < (slidesCount - 1)){
			currPosition = currPosition + 1;
		}
		
		hideButton(currPosition);
		action();
	});
		
	function hideButton(currPosition){
		if(currPosition == 0){
			moveLeftBtn.hide();
		}else{
			moveLeftBtn.show();
		}
			
		if(currPosition == (slidesCount - 1)){
			moveRightBtn.hide();
		}else{
			moveRightBtn.show();
		}
	}
		
	function action(){
		$('#slidesWrapper').animate({
			'marginLeft' : SLIDE_WIDTH * ( -currPosition )
		});
	}
		
	function findPosition(){
		if(currPosition == (slidesCount - 1)){
			currPosition = 0;
			hideButton(currPosition);
		}else{
			currPosition++;
			hideButton(currPosition);
		}
			
		action();
	}
});