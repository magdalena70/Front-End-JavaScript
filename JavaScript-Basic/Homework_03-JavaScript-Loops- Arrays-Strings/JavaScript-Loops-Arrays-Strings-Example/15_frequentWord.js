function findMostFreqWord(inputText) {
    var words = inputText.toLocaleLowerCase().split(/\W+/).filter(Boolean);
    //console.log(words.join(', '));

    var frequentWord = [];
   
    for (var i in words) {
        var word = words[i];
        if (frequentWord[word] === undefined) {
            frequentWord[word] = { word: word, count: 1 }; 
        } else {
            frequentWord[word].count++;
            //console.log(frequentWord);
        }

    }
    
    var sortedWords = [];
    for (var check in frequentWord) {
        if (frequentWord[check].count > 1) {
            sortedWords.push(frequentWord[check]);
        }
    }
    sortedWords.sort(function (a, b) {
        return a.word.localeCompare(b.word);
    });
    for (var i in sortedWords) {
        if (sortedWords[i].count > 1) {
            console.log(sortedWords[i].word + " -> " + sortedWords[i].count + " times");
        }
    }
}

findMostFreqWord('in the middle of the night');
findMostFreqWord('Welcome to SoftUni. Welcome to Java. Welcome everyone.');
findMostFreqWord('Hello my friend, hello my darling. Come on, come here. Welcome, welcome darling.');

/* Write a JavaScript function findMostFreqWord(str) that finds the most frequent word in a text
 and prints it, as well as how many times it appears in format "word -> count".
 Consider any non-letter character as a word separator. Ignore the character casing.
 If several words have the same maximal frequency, print all of them in alphabetical order.
 Write JS program frequentWord.js that invokes your function with the sample input data below 
 and prints the output at the console. 
Examples:
Input	                                                                                Output
'in the middle of the night'	                                                        the -> 2 times

'Welcome to SoftUni. Welcome to Java. Welcome everyone.'	                            welcome -> 3 times

'Hello my friend, hello my darling. Come on, come here. Welcome, welcome darling.'	    come -> 2 times
                                                                                        darling -> 2 times
                                                                                        hello -> 2 times
                                                                                        my -> 2 times
                                                                                        welcome -> 2 times      */