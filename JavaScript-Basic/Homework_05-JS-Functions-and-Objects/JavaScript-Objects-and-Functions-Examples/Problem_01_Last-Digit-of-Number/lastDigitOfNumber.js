'use strict'
function lastDigitOfNumber(number) {
    function isInt(n) {
        return n % 1 === 0;
    }
    
    if (number && typeof (number) === 'number' && isInt(number)) {
        var digit = Math.abs(number % 10); // make it positive and get last digit
        
        switch (digit) {
            case 1: digit = 'One'; break;
            case 2: digit = 'Two'; break;
            case 3: digit = 'Three'; break;
            case 4: digit = 'Four'; break;
            case 5: digit = 'Five'; break;
            case 6: digit = 'Six'; break;
            case 7: digit = 'Seven'; break;
            case 8: digit = 'Eight'; break;
            case 9: digit = 'Nine'; break;
            case 0: digit = 'Zero'; break;
            default: break;
        }

        console.log('Number: %s; Last digit: %s;', number, digit);
    } else {
        console.log('Incorrect input!\n Value: %s\n Type: %s\n Input data must be an integer.', number, typeof(number));
    }

}

lastDigitOfNumber(6);
lastDigitOfNumber(-55);
lastDigitOfNumber(133);
lastDigitOfNumber(14567);
// test incorrect input
lastDigitOfNumber(133.9);
lastDigitOfNumber('6780799');

/* Write a JavaScript function lastDigitOfNumber(number) that returns the last digit of given integer
 as an English word. Write a JS program lastDigitOfNumber.js that invokes your function with the sample
 input data below and prints the output at the console. 
 Examples:
Input	        Output
6	            Six
-55	            Five
133	            Three
14567	        Seven           */