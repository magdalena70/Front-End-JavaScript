function findMostFreqNum(numbersArr){
    var count = 0;
    var maxCount = 0;
    var number = numbersArr[0];
    for (var i = 0; i < numbersArr.length-1; i++) {
        for (var y = i; y < numbersArr.length; y++) {
            if (numbersArr[i] === numbersArr[y]) {
                count++;
            }
        }
        if (count > maxCount) {
            maxCount = count;
            number = numbersArr[i];
        }
        count = 0;
        
    }
    console.log(number + " (" + maxCount + " times)");
}


findMostFreqNum([4, 1, 1, 4, 2, 3, 4, 4, 1, 2, 4, 9, 3]);
findMostFreqNum([2, 1, 1, 5, 7, 1, 2, 5, 7, 3, 87, 2, 12, 634, 123, 51, 1]);
findMostFreqNum([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]);

/* Write a JavaScript function findMostFreqNum(arr) that finds the most frequent number in an array.
  If multiple numbers appear the same maximal number of times, print the leftmost of them.
  Write JS program numberFinder.js that invokes your function with the sample input data below and
  prints the output at the console. 
  Examples:
  Input	                                                        Output
[4, 1, 1, 4, 2, 3, 4, 4, 1, 2, 4, 9, 3]	                        4 (5 times)
[2, 1, 1, 5, 7, 1, 2, 5, 7, 3, 87, 2, 12, 634, 123, 51, 1]	    1 (4 times)
[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]	                    1 (1 times)     */