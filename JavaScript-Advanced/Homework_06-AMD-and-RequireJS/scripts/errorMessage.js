define(['container', 'section', 'item'], function(Container, Section, Item){

	var ErrorMessage = (function(scope){
		function ErrorMessage(){
		}
	
		ErrorMessage.prototype.showErrorMsg = function(message){
			if(!document.getElementById('errorMsg')){
				var errorMsg = document.createElement('div'),
				_this = this;
				
				errorMsg.innerText = message;
				errorMsg.setAttribute('id', 'errorMsg');
				errorMsg.title = 'Click to hide error-message';
				errorMsg.addEventListener('click', function(ev){
					_this.hideErrorMsg();
				});
				
				document.body.insertBefore(errorMsg, document.getElementById('wrapper'));
			}
		}
			
		ErrorMessage.prototype.hideErrorMsg = function(){
			if(document.getElementById('errorMsg')){
				var errorMsg = document.getElementById('errorMsg');
				document.body.removeChild(errorMsg);
			}
		}

		return ErrorMessage = new ErrorMessage();
	}(Container));
	
	return ErrorMessage;
});