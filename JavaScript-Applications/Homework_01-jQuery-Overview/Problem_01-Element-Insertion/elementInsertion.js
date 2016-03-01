$(document).ready(function(){
	'use strict'
	
	var addElemAfterBtn = $('#addAfter'),
		addElemBeforeBtn = $('#addBefore'),
		removeFirstElemBtn = $('<button>'),
		removeLastElemBtn = $('<button>'),
		itemText, listItem;
		
	function validateInputValue(text){
		if(!text || text == false){
			throw new Error('Text can not be empty.');
		}
	}
		
	function addElemAfter(){
		itemText = $('#itemText').val();
		validateInputValue(itemText);
				
		listItem = $('<li/>')
			.text(itemText)
			.css('color', 'green');
					
		$('ul').append(listItem);
		$('#itemText').val('');
	}
		
	function addElemBefore(){
		itemText = $('#itemText').val();
		validateInputValue(itemText);
				
		listItem = $('<li/>')
			.text(itemText)
			.css('color', 'blue');
					
		$('ul').prepend(listItem);
		$('#itemText').val('');
	}
	
	function checkIfChildrenExsist(parentElem){
		if(parentElem.children().length === 0){
			throw new Error('No item to remove.');
		}
	}
		
	function removeFirstElem(parentElem){
		checkIfChildrenExsist(parentElem);	
		parentElem.children().first().remove();
	}
		
	function removeLastElem(parentElem){
		checkIfChildrenExsist(parentElem);		
		parentElem.children().last().remove();
	}
		
	// add eventListener
	addElemAfterBtn.css('color', 'green')
		.on('click', addElemAfter);
		
	addElemBeforeBtn.css('color', 'blue')
		.on('click', addElemBefore);
		
	removeFirstElemBtn.text('Remove first')
		.attr('id', 'removeFirst')
		.on('click', function(){
			removeFirstElem($('ul'));
		})
		.appendTo('#wrapper');
			
	removeLastElemBtn.text('Remove last')
		.attr('id', 'removeLast')
		.on('click', function(){
			removeLastElem($('ul'));
		})
		.appendTo('#wrapper');
	//-------------------	
	
	$('*').css('margin', '10px');
});