'use strict'
function biggerThanNeighbors(index, arr){
    if (index >= 0 && arr && arr.length > 0) {
        if (index > arr.length-1 || index % 1 !== 0) {
            console.log('invalid index');
        } else {
            if (index === 0 || index === arr.length - 1) {
                console.log('only one neighbor');
            } else {
                //console.log(arr + ' -> ' + index);
                if (arr[index] > arr[index-1] && arr[index] > arr[index+1]) {
                    console.log('bigger');
                } else {
                    console.log('not bigger');
                }
            }
        }
    }
}

biggerThanNeighbors(2, [1, 2, 3, 3, 5]);
biggerThanNeighbors(2, [1, 2, 5, 3, 4]);
biggerThanNeighbors(5, [1, 2, 5, 3, 4]);
biggerThanNeighbors(0, [1, 2, 5, 3, 4]);
biggerThanNeighbors(4, [1, 2, 3, 3, 5]);


/* Write a JavaScript function biggerThanNeighbors(index,  arr) that accept a number and an integer array
 as parameters. The function should return a Boolean number: whether the element at the given position in
 the array is bigger than its two neighbors (when such exist). It should return undefined when the index doesn't exist.
 Write a JS program that invokes the function with the sample data below and prints the result at the console
 following the samples below:
Input	                Output
2, [1, 2, 3, 3, 5]	    not bigger
2, [1, 2, 5, 3, 4]	    bigger
5, [1, 2, 5, 3, 4]	    invalid index
0, [1, 2, 5, 3, 4]	    only one neighbor  
4, [1, 2, 3, 3, 5]      only one neighbor    */