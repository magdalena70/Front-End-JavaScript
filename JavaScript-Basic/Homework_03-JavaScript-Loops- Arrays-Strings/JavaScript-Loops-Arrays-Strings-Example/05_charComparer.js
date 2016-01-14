function compareChars(arr1, arr2) {

    var isEqual = true;

    if (arr1.length != arr2.length) {
        isEqual = false;
    } else {
        for (var i = 0; i < arr1.length; i++) {
            if (arr1[i] != arr2[i]) {
                isEqual = false;
            }
        }
    }

    if (isEqual) {
        console.log('Equal');
    } else {
        console.log('Not Equal');
    }
}

compareChars(['1', 'f', '1', 's', 'g', 'j', 'f', 'u', 's', 'q'], ['1', 'f', '1', 's', 'g', 'j', 'f', 'u', 's', 'q']);
compareChars(['3', '5', 'g', 'd'], ['5', '3', 'g', 'd']);
compareChars(['q', 'g', 'q', 'h', 'a', 'k', 'u', '8', '}', 'q', '.', 'h', '|', ';'], ['6', 'f', 'w', 'q', ':', '”', 'd', '}', ']', 's', 'r']);

/* Write a JavaScript function compareChars(arr1, arr2) that compares two arrays of chars
 lexicographically (letter by letter). Write JS program charComparer.js that invokes your function
 with the sample input data below and prints the output at the console.
 Examples:
 Input	                                                                    Output
['1', 'f', '1', 's', 'g', 'j', 'f', 'u', 's', 'q'] 
['1', 'f', '1', 's', 'g', 'j', 'f', 'u', 's', 'q']	                        Equal

['3', '5', 'g', 'd'] 
['5', '3', 'g', 'd']	                                                    Not Equal
 
['q', 'g', 'q', 'h', 'a', 'k', 'u', '8', '}', 'q', '.', 'h', '|', ';']
['6', 'f', 'w', 'q', ':', '”', 'd', '}', ']', 's', 'r']	                    Not Equal   */