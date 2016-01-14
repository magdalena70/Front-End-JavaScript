function replaceSpaces(inputStr) {
    var regexp = new RegExp(" ", 'g');
    var result = inputStr.replace(regexp, "");
    console.log(result);
}

replaceSpaces("But you were living in another world tryin' to get your message through");

/* Write a JavaScript function replaceSpaces(str) that replaces the white-space characters
 in a text with &nbsp;. Write JS program spaceReplacer.js that invokes your function with the sample
 input data below and prints the output at the console. 
Examples:
Input	                                                                        
'But you were living in another world tryin' to get your message through'
Output	   
 Butyouwerelivinginanotherworldtryin'togetyourmessagethrough   */