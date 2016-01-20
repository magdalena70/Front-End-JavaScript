'use strict'
function findLargestBySumOfDigits(arr){

    function ifArgumentIsNumber(inputArr){
        var index, arg;

        for (index in inputArr) {
            arg = Number(inputArr[index]);
            if (isNaN(arg)) {
                return false;
                break;
            } else {    
                return true;
            }
        };
    }

    if (arguments.length === 1 && arr.length > 0 && ifArgumentIsNumber(arr)) {
        var elem, i, number, dig, sum = 0, maxSum = 0, maxNum;

        //console.log(arr);
        for (i in arr) {
            elem = arr[i];

            if (Number(elem) % 1 !== 0) {
                console.log('undefined'); // check if some of the arguments is not an integer number
                return;
            }

            number = Math.abs(elem).toString();
            for(dig in number) {
                sum += Number(number[dig]);
            };

            if (sum > maxSum) {
                maxSum = sum;
                maxNum = elem;
            }

            sum = 0;
        };

        console.log(maxNum);       
    } else {
        console.log('undefined');
    }
}

findLargestBySumOfDigits([5, 10, 15, 111]);
findLargestBySumOfDigits([33, 44, -99, 0, 20]);
findLargestBySumOfDigits(['hello']);// --> check if some of the arguments is NaN
findLargestBySumOfDigits([5, 3.3]);// --> check if some of the arguments is not an integer number
//findLargestBySumOfDigits();//-->check if 0 arguments are passed
//findLargestBySumOfDigits([]);//-->check if array is empty

/* Write a JavaScript function findLargestBySumOfDigits(arr) that accepts as a parameter an array of numbers
 or/and strings and returns the element with the largest sum of its digits. The function should take a variable
 number of arguments. It should return undefined when 0 arguments are passed or when some of the arguments
 is not an integer number. Write a JS program largestSumOfDigits.js that invokes your function with the sample
 input data below and prints its output at the console. 
Examples:
Input	                        Output
[5, 10, 15, 111]	            15
[33, 44, -99, 0, 20]	        -99
['hello']	                    undefined
[5, 3.3]	                    undefined       */