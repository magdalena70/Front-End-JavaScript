'use strict';

var specialConsole = (function specialConsole() {
    
    function writeLine() {
        var result = '';
        if (arguments.length > 1) {
			for(var i = 1; i < arguments.length; i++){
				if(arguments[0].indexOf('{'+ (i-1) +'}') > -1){
					arguments[0] = arguments[0].replace('{'+ (i-1) +'}', arguments[i]);
				}else{
					console.error('Error: there are not enough arguments passed.');
					return;
				}
			}
            result = console.log(arguments[0]);
        } else if (arguments.length == 1) {
            result = console.log(arguments[0]);
        } else {
            result = console.log('\r\n');
        }

        return result;
    }
	
	function writeInfo() {
        var result = '';
        if (arguments.length > 1) {
			for(var i = 1; i < arguments.length; i++){
				if(arguments[0].indexOf('{'+ (i-1) +'}') > -1){
					arguments[0] = arguments[0].replace('{'+ (i-1) +'}', arguments[i]);
				}else{
					console.error('Error: there are not enough arguments passed.');
					return;
				}
			}	
            result = console.info('Info: ' + arguments[0]);
        } else if (arguments.length == 1) {
            result = console.info('Info: ' + arguments[0]);
        } else {
            result = console.info('Error: Info cannot be empty!');
        }

        return result;
    }
	
	function writeError() {
        var result = '';
        if (arguments.length > 1) {
			for(var i = 1; i < arguments.length; i++){
				if(arguments[0].indexOf('{'+ (i-1) +'}') > -1){
					arguments[0] = arguments[0].replace('{'+ (i-1) +'}', arguments[i]);
				}else{
					console.error('Error: there are not enough arguments passed.');
					return;
				}
			}	
            result = console.error('Error: ' + arguments[0]);
        } else if (arguments.length == 1) {
            result = console.error('Error: ' + arguments[0]);
        } else {
            result = console.error('Error: Info cannot be empty!');
        }

        return result;
    }
	
	function writeWarning() {
        var result = '';
        if (arguments.length > 1) {
			for(var i = 1; i < arguments.length; i++){
				if(arguments[0].indexOf('{'+ (i-1) +'}') > -1){
					arguments[0] = arguments[0].replace('{'+ (i-1) +'}', arguments[i]);
				}else{
					console.error('Error: there are not enough arguments passed.');
					return;
				}
			}	
            result = console.warn('Warning: ' + arguments[0]);
        } else if (arguments.length == 1) {
            result = console.warn('Warning: ' + arguments[0]);
        } else {
            result = console.warn('Warning: Info cannot be empty!');
        }

        return result;
    }
      
    return {
        writeLine : writeLine,
        writeInfo : writeInfo,
        writeError : writeError,
        writeWarning : writeWarning
    };
})();

specialConsole.writeLine("Message: hello");
specialConsole.writeLine("Message: {0}", "hello");
specialConsole.writeLine("Message: {1}", "hello"); // return error
specialConsole.writeLine(); // return new line
specialConsole.writeLine("Object: {0} is {1} old.", 
    { name: "Gosho", toString: function () { return this.name } },
    { age: 29, toString: function () { return this.age } });
specialConsole.writeError("{0}", "A fatal error has occurred.");
specialConsole.writeError();
specialConsole.writeWarning("{0}", "You are not allowed to do that!");
specialConsole.writeWarning();
specialConsole.writeInfo();
specialConsole.writeInfo("Hi there! Here is some info for you.");
specialConsole.writeInfo("{0}", "Hi there! Here is some info for you.");
specialConsole.writeError("Error object: {0}", { msg: "An error happened", toString: function () { return this.msg } });
