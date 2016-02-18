// Implement popup function constructors
var poppy = poppy || {};

(function(scope){
	function Poppy(title, message, type, position, autoHide, closeButton, timeout, callback){
		this._popupData = {
			'title': title,
			'message': message,
			'type': type,
			'position': position,
			'autoHide': autoHide || false,
			'closeButton': closeButton || false,
			'timeout': timeout || 0,
			'callback': callback || false
		};
		
		return Poppy;
	}
	
	var Success = (function(){
		function Success(title, message){
			Poppy.call(this, title, message, 'success', 'bottomLeft');
		}
		
		return Success;
	}());
	
	var Info = (function(){
		function Info(title, message){
			Poppy.call(this, title, message, 'info', 'topLeft');
			this._popupData.closeButton = true;
		}
		
		return Info;
	}());
	
	var Error = (function(){
		function Error(title, message){
			Poppy.call(this, title, message, 'error', 'topRight');
			this._popupData.autoHide = true;
			this._popupData.timeout = 4000;
		}
		
		return Error;
	}());
	
	var Warning = (function(){
		function Warning(title, message, callback){
			Poppy.call(this, title, message, 'warning', 'bottomRight');
			this._popupData.callback = callback;
		}
		
		return Warning;
	}());
	
	scope._poppy = {
		Success: Success,
        Info: Info,
        Error: Error,
        Warning: Warning
	};
}(poppy));