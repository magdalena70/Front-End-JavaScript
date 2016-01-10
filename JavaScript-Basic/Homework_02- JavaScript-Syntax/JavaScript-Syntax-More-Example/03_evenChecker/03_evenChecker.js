function evenNumber(number) {
    var isEven = true;
    if (number % 2 != 0) {
        isEven = false;
    }
    console.log(isEven);
}

evenNumber(3);
evenNumber(127);
evenNumber(588);


//Write a JavaScript function evenNumber(number) that checks if an integer number is even.
//Write JS program evenChecker.js to check if a few numbers are even.
//The result should be printed on the console(true or false).Run the program through Node.js.

//Example:
//Input	    Output
// 3        false
// 127      false
// 588      true