$(document).ready(function(){
	'use strict'
	
	function showErrorMsg(text){
		var errorMessage = $('<div/>').text(text)
				.attr('id', 'errorMessage');
		
		$('body').prepend(errorMessage);
		errorMessage.fadeOut(9000);
	}

	$('#createBtn').on('click', function(){
		var list = $('<li/>'),
			listText = $('#listText').val(),
			className = $('#className').val(),
			listBackgroundColor = $('#backgroundColor').val(),
			result = $('#result');
			
			if(!listText || listText == false){
				showErrorMsg('Text can not be empty.');
				throw new Error('Text can not be empty.');
			}
			
			list.text(listText)
				.on('click', function(){
					this.remove();
				})
				.attr('title', 'click to remove')
				.appendTo(result);
			if(className && className != false){
				list.attr('class', className)
					.css('backgroundColor', listBackgroundColor);
			}
			
			$('#listText').val('');
			$('#className').val('');
	})
});