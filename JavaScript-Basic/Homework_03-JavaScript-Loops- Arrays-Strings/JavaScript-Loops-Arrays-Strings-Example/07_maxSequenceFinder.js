function findMaxSequence(inputArr) {
    var counter = 1;
    var maxCounter = 1;
    var maxIndex = 0;
    for (var i = 1; i < inputArr.length; i++) {
        if (inputArr[i - 1] < inputArr[i]) {
            counter++;
            if (maxCounter < counter) {
                maxCounter = counter;
                maxIndex = i - counter + 1;
            }
        } else {
            counter = 1;
        }
    }
    
    var result = [];
    for (var i = maxIndex; i < maxIndex + maxCounter; i++) {
        result.push(inputArr[i]);
    }
    if (result.length >= 2) {
        console.log(result);
    } else {
        console.log("no");
    }
}

findMaxSequence([3, 2, 3, 2, 2, 4]);
findMaxSequence([3, 5, 4, 6, 1, 2, 3, 6, 10, 32]);
findMaxSequence([3, 2, 1]);

/* Write a JavaScript function findMaxSequence(arr) that finds the maximal increasing sequence
 in an array of numbers and returns the result as an array. If there is no increasing sequence
 the function returns 'no'.
 Write JS program maxSequenceFinder.js that invokes your function with the sample input data below
 and prints the output at the console.
 Examples:
 Input	                                    Output
[3, 2, 3, 4, 2, 2, 4]		                [2, 3, 4]
 
[3, 5, 4, 6, 1, 2, 3, 6, 10, 32]	        [1, 2, 3, 6, 10, 32]
 
[3, 2, 1]	                                no                       */