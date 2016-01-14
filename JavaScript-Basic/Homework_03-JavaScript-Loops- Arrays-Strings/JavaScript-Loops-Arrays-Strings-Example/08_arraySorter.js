function sortArray(numArr){
    numArr.sort(function (numA, numB) {
        return numA - numB;
    });
    console.log(numArr.join(", "));
}

sortArray([5, 4, 3, 2, 1]);
sortArray([12, 12, 50, 2, 6, 22, 51, 712, 6, 3, 3]);
sortArray([500, 1, -23, 0, -300, 28, 35, 12]);


/* Sorting an array means to arrange its elements in increasing order.
 Write a JavaScript function sortArray(arr) to sort an array. Use the "selection sort" algorithm:
 find the smallest element, move it at the first position, find the smallest from the rest,
 move it at the second position, etc. Write JS program arraySorter.js that invokes your function
 with the sample input data below and prints the output at the console.
 Examples:
 Input	                                        Output
[5, 4, 3, 2, 1]                             	1, 2, 3, 4, 5

[12, 12, 50, 2, 6, 22, 51, 712, 6, 3, 3]	    2, 3, 3, 6, 6, 12, 12, 22, 50, 51, 712  */