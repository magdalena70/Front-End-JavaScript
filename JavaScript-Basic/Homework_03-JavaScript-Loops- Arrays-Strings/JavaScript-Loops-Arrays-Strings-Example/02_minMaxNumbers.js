function findMinAndMax(inputNumArr){
    inputNumArr.sort(function (numA, numB) {
        return numA > numB; 
    });
    console.log('Min -> ' + inputNumArr[0] + '\nMax -> ' + inputNumArr[inputNumArr.length-1]);
}

findMinAndMax([1, 2, 1, 15, 20, 5, 7, 31]);
findMinAndMax([2, 2, 2, 2, 2]);
findMinAndMax([500, 1, -23, 0, -300, 28, 35, 12]);

/*  Write a JavaScript function findMinAndMax(arr) that accepts as parameter an array of numbers.
 The function finds the minimum and the maximum number. Write a JS program minMaxNumbers.js
 that invokes your function with the sample input data below and prints the output at the console.
 Examples:
 Input	                                Output
[1, 2, 1, 15, 20, 5, 7, 31]	            Min -> 1
                                        Max -> 31
 
[2, 2, 2, 2, 2]	                        Min -> 2
                                        Max -> 2
 
[500, 1, -23, 0, -300, 28, 35, 12]	    Min -> -300
                                        Max -> 500     */