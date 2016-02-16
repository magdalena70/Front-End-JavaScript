'use strict';

var HtmlElem =(function(){
	function HtmlElem(title){
		if(!title || title == false){
			errorMessage('Invalit input! Title and content can not be empty.', 'errorMsg', 'wrapper');
			throw new Error('Invalit input. Empty data.');
		}
		
		removeErrorMessage('errorMsg');
		this._title = title;
		this._colection = [];
	}
	
	return HtmlElem;	
}());