(function(){
	localStorage.clear();

	var errorMsgBox = $('<div>')
			.attr('id', 'errorMsgBox')
			.prependTo($('body'))
			.hide();
	
	$('#startGame').on('click', startGame);

	$('#result').hide();
	$('#formQuestions').hide();
	
	function startGame(){
		createTimer('#timerBox');
		$('input[type="radio"]').removeAttr('checked');
		
		$('#startGame').hide();
		$('#timeOut').hide();
		$('#formQuestions').show();
		
		$('#submitBtn').on('click', showResult);
		$('#tryAgainBtn').on('click', tryAgain);
		
		setLocalStorage('input[name="question1"]', 'question1');
		setLocalStorage('input[name="question2"]', 'question2');
		setLocalStorage('input[name="question3"]', 'question3');
		setLocalStorage('input[name="question4"]', 'question4');
	}	
	
	function setLocalStorage(radioBtnSelector, storageName){
		$(radioBtnSelector).on('click', function(){
			localStorage.setItem(storageName, $(this).attr('id'));
		});
	}
	
	function createTimer(timerBoxId){
		var ONE_MINUTE_IN_SECONDS = 60,
			minutesInSeconds = 60,
			seconds = 60,
			timer = setInterval(setTimer, 1000),
			timerBox = $(timerBoxId),
			minutes, stringResult;
			
		function setTimer(){
			minutesInSeconds--;
			seconds--;
			minutes = Math.floor(minutesInSeconds / ONE_MINUTE_IN_SECONDS);
			
			if(seconds < 10){
				stringResult = minutes + ':0' + seconds;
			}else{
				stringResult = minutes + ':' + seconds;
			}
			
			if (seconds === 0) {
				seconds = ONE_MINUTE_IN_SECONDS;
			}
			
			if ((minutesInSeconds / ONE_MINUTE_IN_SECONDS) === 0){
				clearInterval(timer);
				timeOut();
			}
			
			timerBox.text(stringResult);
		}
	}
	
	function timeOut(){
		localStorage.clear();
		
		$('#timeOut')
			.text('Game over...Try again!')
			.css('backgroundColor', '#70292D')
			.css('color', '#E4D1B9')
			.css('fontSize', '35px')
			.show();
		
		errorMsgBox.hide();
		$('#formQuestions').hide();
		$('#result').hide();

		$('#startGame').show();
	}
	
	function findCurrentAnswer(answerId){
		var currentAnswer = $('#' + answerId).attr('checked', 'checked');
		
		return currentAnswer = currentAnswer[0].defaultValue;
	}
	
	function checkAnswer(storageName, errorMsg, currentAnswer){
		if (localStorage[storageName]) {
			localStorage[currentAnswer] = findCurrentAnswer(localStorage[storageName]);
			return true;
		}else{
			errorMsgBox.text(errorMsg).show();
			return false;
		}
	}
	
	function createAnswerView(answerSelector, answerText, correctAnswer, messageSelector){
		var correctAnswerMsg = 'Your answer is correct!',
			incorrectAnswerMsg = 'Тhis is not the right answer. Try again!';
			
			$(answerSelector).text(answerText).css('fontWeight', 'bold');
			$(messageSelector).css('color', '#70292D').css('fontWeight', 'bold');
			if(answerText == correctAnswer){
				$(messageSelector).text(correctAnswerMsg);
			}else{
				$(messageSelector).text(incorrectAnswerMsg).css('color', '#fff');
			}
	}
	
	function showResult(){
		if(checkAnswer('question1', 'Question - 1 is required!', 'currAnswer1') &&	
			checkAnswer('question2', 'Question - 2 is required!', 'currAnswer2') &&
			checkAnswer('question3', 'Question - 3 is required!', 'currAnswer3') &&
			checkAnswer('question4', 'Question - 4 is required!', 'currAnswer4')){
			
			errorMsgBox.hide();
			$('#formQuestions').hide();
			
			createAnswerView('#result-answer1', localStorage['currAnswer1'], 'Fourth answer', '#answer1-message');
			createAnswerView('#result-answer2', localStorage['currAnswer2'], 'Third answer', '#answer2-message');
			createAnswerView('#result-answer3', localStorage['currAnswer3'], 'Fourth answer', '#answer3-message');
			createAnswerView('#result-answer4', localStorage['currAnswer4'], 'First answer', '#answer4-message');
			
			if(localStorage['currAnswer1'] == 'Fourth answer' &&
				localStorage['currAnswer2'] == 'Third answer' &&
				localStorage['currAnswer3'] == 'Fourth answer' &&
				localStorage['currAnswer4'] == 'First answer'){
				
				$('#timeOut').text('WINNER!!!')
					.css('color', '#fff')
					.css('font-size', '40px').show();
				$('#result').hide();
			}else{
				$('#result').show();
			}
		}
	}
	
	function tryAgain(){
		$('#result').hide();
		$('#formQuestions').show();
	}

}());