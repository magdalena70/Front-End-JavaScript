function findPalindromes(givenText){
    //make text to lower case; removing all elements which are not letters and removing empty elements
    var words = givenText.toLowerCase().split(/\W+/).filter(Boolean);

    var palindromes = [];
    for (var i = 0; i < words.length; i++) {
        if (words[i] == words[i].split('').reverse().join('')) {
            palindromes.push(words[i]);
        }
    }
    console.log(palindromes.join(', '));
}

findPalindromes('There is a man, his name was Bob.');





/* Write a JavaScript function findPalindromes(str) that extracts from a given text
 all palindromes, e.g. "ABBA", "lamal", "exe".Write JS program palindromesExtract.js
 that invokes your function with the sample input data below and prints the output at the console. 
 Examples:
Input	                                    Output
'There is a man, his name was Bob.'	        a, bob    */