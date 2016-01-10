function convertDigitToWord(digit) {
    var word = "";
    if (digit > 0 && digit < 10) {
        switch(digit) {
            case 1: word = "one"; break;
            case 2: word = "two"; break;
            case 3: word = "three"; break;
            case 4: word = "four"; break;
            case 5: word = "five"; break;
            case 6: word = "six"; break;
            case 7: word = "seven"; break;
            case 8: word = "eight"; break;
            case 9: word = "nine"; break;
            default: break;
        }
        console.log(word);
    } else {
        console.log("Input is out of bound:  [0 > n < 10].")
    }
}

convertDigitToWord(8);
convertDigitToWord(3);
convertDigitToWord(5);
convertDigitToWord(15);


//Write a JavaScript function convertDigitToWord(value) that prints the name of an integer 
//number n(0 < n < 10) in English using switch statement. Write JS program digitAsWord.js
//that prints a few digits on the console.Run the program through Node.js.

//Example:
//Input	    Output
// 8        eight
// 3        three
// 5        five