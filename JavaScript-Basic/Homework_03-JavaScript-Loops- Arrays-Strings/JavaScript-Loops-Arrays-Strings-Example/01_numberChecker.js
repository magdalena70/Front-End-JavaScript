function printNumbers(number) {
    var index = 0;
    var numberArr = [];
    if (number < 0) {
        console.log("no");
    } else {
        for (var i = 1; i <= number; i++) {
            numberArr [index] = i;
            index++;
        }
        
        var resultArr = [];
        var indexResult = 0;
        for (var y = 0; y < numberArr.length; y++) {
            if (numberArr[y] % 4 == 0 || numberArr[y] % 5 == 0) {
                continue;
            } else {
                resultArr[indexResult] = numberArr[y];
                indexResult++;
            }
        }
        console.log(resultArr.join(", "));
    }
}

printNumbers(20);
printNumbers(-5);
printNumbers(13);

/*----> Write a JavaScript function printNumbers(number) that accepts as parameter an integer number.
 The function finds all integer numbers from 1 to n that are not divisible by 4 or by 5.
 Write a JS program numberChecker.js that invokes your function with the sample input data
 below and prints the output at the console.
 * 
 Example:
 Input	        Output
 20	            1, 2, 3, 6, 7, 9, 11, 13, 14, 17, 18, 19
 -5	            no
 13	            1, 2, 3, 6, 7, 9, 11, 13 <----*/