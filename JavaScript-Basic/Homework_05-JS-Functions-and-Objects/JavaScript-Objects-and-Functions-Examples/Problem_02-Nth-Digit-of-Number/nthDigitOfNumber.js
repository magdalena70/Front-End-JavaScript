'use strict'
function findNthDigit(arr) {
    if (arr && arr.length === 2 && !isNaN(Number(arr[0])) &&
         !isNaN(Number(arr[1])) && Number(arr[0]) % 1 === 0) {
        //console.log(arr);
        var n = Number(arr[0]), num = arr[1],
        numToArrReversed = Math.abs(num).toString().replace(/[.]/g, '').split('').reverse();
        
        if (n > numToArrReversed.length) {
            console.log('The number doesn’t have %s digits', n);
        } else {
            console.log(numToArrReversed[n-1]);
        }
    } else {
        console.log('Incorrect input');
    }
}

findNthDigit([1, 6]);
findNthDigit([2, -55]);
findNthDigit([6, 923456]);
findNthDigit([3, 1451.78]);
findNthDigit([6, 888.88]);
// test incorrect input
findNthDigit(['u', 923456]);
findNthDigit([6, '923k456']);

/* Write a JavaScript function findNthDigit(arr) that accepts as a parameter an array of two numbers
 num and n and returns the n-th digit of given decimal number num counted from right to left.
 Return undefined when the number does not have n-th digit. Write a JS program nthDigitOfNumber.js
 that invokes your function with the sample input data below and prints the output at the console. 
Examples:
Input	                    Output
[1, 6]	                    6
[2, -55]	                5
[6, 923456]	                9
[3, 1451.78]	            1
[6, 888.88]	                The number doesn’t have 6 digits         */