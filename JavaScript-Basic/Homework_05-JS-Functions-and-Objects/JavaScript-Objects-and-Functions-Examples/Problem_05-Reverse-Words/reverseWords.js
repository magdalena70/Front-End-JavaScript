'use strict'
function reverseWordsInString(str){
    if (str && typeof(str) === 'string') {
        //console.log(str);
        var strToArr = str.split(' ');
        strToArr = strToArr.map(function (elem) { 
            return elem.split('').reverse().join('');
        });

        console.log(strToArr.join(' '));
    }
}

reverseWordsInString('Hello, how are you.');
reverseWordsInString('Life is pretty good, isn’t it?');


/* Write a JavaScript function reverseWordsInString(str) that accepts as a parameter a string and reverses
 the characters of every word in the string but leaves the words in the same order. Words are considered
 to be sequences of characters separated by spaces. Write a JavaScript program reverseWords.js that prints
 on the console the output of the examples below:
Input	                                Output
'Hello, how are you.'	                ,olleH woh era .uoy
'Life is pretty good, isn’t it?'	    efiL si ytterp ,doog t'nsi ?ti     */