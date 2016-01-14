function checkBrackets(inputStr) {
    var countLeft = 0;
    var countRight = 0;
    for (var simbol in inputStr) {
        if (inputStr[simbol] == '(') {
            countLeft++;
        } else if(inputStr[simbol] == ')'){
            countRight++;
        }
    }
    if (countLeft == countRight) {
        console.log('correct');
    } else {
        console.log('incorrect');
    }
}

checkBrackets('( ( a + b ) / 5 – d )');
checkBrackets(') ( a + b ) )');
checkBrackets('( b * ( c + d *2 / ( 2 + ( 12 – c / ( a + 3 ) ) ) )');

/* Write a JavaScript function checkBrackets(str) to check if in a given expression
 the brackets are put correctly. Write JS program bracketsChecker.js that invokes your function
 with the sample input data below and prints the output at the console. 
Examples:
Input	                                                    Output
'( ( a + b ) / 5 – d )'	                                    correct
  
') ( a + b ) )'	                                            incorrect
  
'( b * ( c + d *2 / ( 2 + ( 12 – c / ( a + 3 ) ) ) )'	    incorrect     */