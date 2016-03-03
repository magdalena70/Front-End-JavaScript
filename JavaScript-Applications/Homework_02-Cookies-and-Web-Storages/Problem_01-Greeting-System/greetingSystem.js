(function(){
	var errorMsg = $('<div>').attr('id', 'errorMsg').prependTo($('body')).hide(),
	greeting, sessionVisits, totalVisits;
	
	function showErrorMsg(message){
		errorMsg.text(message).show();
	}

	function login(){
		var userName = $('#userName').val();
		if(!userName || userName == false){
			showErrorMsg('Username can not be empty.');
			return false;
		}
		
		localStorage.setItem('userName', userName);
	}
	
	function logout(){
		if(localStorage['userName'] || localStorage['visitsCount']){
			localStorage.removeItem('userName');
        	localStorage.removeItem('visitsCount');
		}
		
		if(sessionStorage['visitsCount']){
        	sessionStorage.removeItem('visitsCount');
		}
		
		$('form').show();
		$('header').show();
		$('#result').children().remove().hide();
	}
	
	if(localStorage['userName']){
		$('form').hide();
		$('header').hide();
		
		if(!localStorage['visitsCount']){
			localStorage.setItem('visitsCount', 0);
		}
		
		if(!sessionStorage['visitsCount']){
			sessionStorage.setItem('visitsCount', 0);
		}
		
		localStorage['visitsCount']++;
		sessionStorage['visitsCount']++;
		
		greeting = $('<h3>').text('Hello, ' + localStorage['userName'] + '!').appendTo('#result');
		sessionVisits = $('<p>').text('Session visits count: ' + sessionStorage['visitsCount']).appendTo($('#result'));
		totalVisits = $('<p>').text('Total visits count: ' + localStorage['visitsCount']).appendTo($('#result'));
			
		if(localStorage['visitsCount'] > 1){
			greeting.text(localStorage['userName'] + ', hello again! ;)');
		}
    }
	
	$('#login').on('click', login);
	$('#logout').on('click', logout);
}());