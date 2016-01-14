function findMaxSequence(inputArr) {
    var result = [];
    var maxSequense = inputArr[0];
    var counter = 1;
    var maxCounter = 1;
    for (var i = inputArr.length - 1; i > 1; i--) {
        if (inputArr[i] === inputArr[i - 1]) {
            counter++;
            if (maxCounter < counter) {
                maxCounter = counter;
                maxSequense = inputArr[i];
            }
        } else {
            counter = 1;
        }
    }
    
    for (var i = 0; i < maxCounter; i++) {
        result.push(maxSequense);
    }
    console.log(result);
}

findMaxSequence([2, 1, 1, 2, 3, 3, 2, 2, 2, 1]);
findMaxSequence(['happy']);
findMaxSequence([2, 'qwe', 'qwe', 3, 3, '3']);
findMaxSequence([2, 1, 1, 1, 2, 3, 3, 7, 7, 7, 1]);

/* Write a JavaScript function findMaxSequence(arr) that finds the maximal sequence of equal elements
 in an array and returns the result as an array. If there is more than one sequence with the same maximal length,
 print the rightmost one. Write JS program sequenceFinder.js that invokes your function with the sample input
 data below and prints the output at the console.
 Examples:
 Input	                                Output
[2, 1, 1, 2, 3, 3, 2, 2, 2, 1]	        [2, 2, 2]
 
['happy']	                            [happy]
 
[2, 'qwe', 'qwe', 3, 3, '3']	        [3, 3]        

[2, 1, 1, 1, 2, 3, 3, 7, 7, 7, 1]       [7, 7, 7]    */