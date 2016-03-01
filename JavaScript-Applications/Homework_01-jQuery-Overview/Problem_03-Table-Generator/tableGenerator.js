$(document).ready(function(){
	'use strict'
	
	function showErrorMsg(text){
		var errorMessage = $('<div/>').text(text)
				.attr('id', 'errorMessage');
		
		$('body').prepend(errorMessage);
		errorMessage.fadeOut(9000);
	}
	
	$('#generateTableBtn').on('click', function(){
		var jsonStr = $('#inputJsonStr').val(),
			table = $('<table/>').attr('id', 'table'),
			thead = $('<thead/>').appendTo(table),
			tbody = $('<tbody/>').appendTo(table),
			jsonStrToObj, th, td, trHead, trBody, index, key, value;
		
		if(!jsonStr || jsonStr == false){
			showErrorMsg('Input can not be empty.');
			throw new Error('Input can not be empty.');
		}
		
		
		try{
			if(typeof jQuery.parseJSON(jsonStr) != 'object'){
				showErrorMsg('Invalid string.');
				throw new SyntaxError('Invalid string.');
			}
			
			jsonStrToObj = jQuery.parseJSON(jsonStr);
		}catch(er){
			showErrorMsg('Ivalid input. You should enter only a JSON string!' + er);
			throw new Error('Ivalid input. You should enter only a JSON string!');
		}
		
		// create thead
		if(typeof jsonStrToObj[0] != 'object'){
			trHead = $('<tr/>').appendTo(thead);
			trBody = $('<tr/>').appendTo(tbody);
			for(key in jsonStrToObj){
				if(!key || key == false ||
					!jsonStrToObj[key] || jsonStrToObj[key] == false ||
					typeof jsonStrToObj[key] == 'object'){
					
					showErrorMsg('Key or value can not be empty and must be a string.');
					throw new Error('Key or value can not be empty and must be a string.');
				}
				
				th = $('<th/>').text(key).appendTo(trHead);
				td = $('<td/>').text(jsonStrToObj[key]).appendTo(trBody);
			}
		}
		
		if(typeof jsonStrToObj[0] == 'object'){
			trHead = $('<tr/>').appendTo(thead);
			for(key in jsonStrToObj[0]){
				if(!key || key == false){
					showErrorMsg('Key can not be empty.');
					throw new Error('Key can not be empty.');
				}
				
				th = $('<th/>').text(key).appendTo(trHead);
			}
			
			// create tbody
			for(index in jsonStrToObj){
				trBody = $('<tr/>').appendTo(tbody);
				for(value in jsonStrToObj[index]){
					if(!jsonStrToObj[index][value] ||
						jsonStrToObj[index][value] == false ||
						typeof jsonStrToObj[index][value] == 'object'){
						
						showErrorMsg('Value can not be empty and must be a string.');
						throw new Error('Value can not be empty and must be a string.');
					}
					
					td = $('<td/>').text(jsonStrToObj[index][value]).appendTo(trBody);
				}
			}
		}
		
		if($('#table').length){
			$('#table').remove();
		}
		
		$('#result').append(table);
		$('#inputJsonStr').val('');
	});
});