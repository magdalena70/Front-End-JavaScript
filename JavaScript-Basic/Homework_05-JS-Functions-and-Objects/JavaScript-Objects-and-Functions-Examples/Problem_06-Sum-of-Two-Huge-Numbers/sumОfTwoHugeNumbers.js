'use strict'
var BigNumber = require('./bignumber.min.js'); // Use external libraries.

function sumTwoHugeNumbers(value) {
    var num1 = BigNumber(value[0]), num2 = BigNumber(value[1]);

    return num1.plus(num2).toString(10);
}

console.log(sumTwoHugeNumbers(['155', '65']));
console.log(sumTwoHugeNumbers(['123456789', '123456789']));
console.log(sumTwoHugeNumbers(['887987345974539', '4582796427862587']));
console.log(sumTwoHugeNumbers(['347135713985789531798031509832579382573195807',
                               '817651358763158761358796358971685973163314321']));

/* Write a JavaScript function sumTwoHugeNumbers(value) that accepts as parameter an array containing
 the two numbers. The input numbers are represented as strings. 
 The result should be printed on the console. 
Example:
Input	                                                Output
['155', '65']	                                        220
 
['123456789', '123456789']	                            246913578
 
['887987345974539','4582796427862587']	                5470783773837126
 
['347135713985789531798031509832579382573195807',
 '817651358763158761358796358971685973163314321']	    1164787072748948293156827868804265355736510128    */