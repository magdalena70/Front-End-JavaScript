function checkDigit(inputNum) {
    isThree = false;
    var thirdDigit = 0;
    if (inputNum > 1000) {
        thirdDigit = Math.floor(inputNum % 1000 / 100);
        //check thirdDigit
        //console.log(thirdDigit);

        if (thirdDigit == 3) {
            isThree = true;
        }
    }
    console.log(isThree);
}

checkDigit(1235);
checkDigit(25368);
checkDigit(123456);

//Write a JavaScript function checkDigit(number) that finds if the third digit (right-to-left)
//of an integer number n(n > 1000) is 3. Write JS program digitChecker.js that checks a few numbers.
//The result(true or false) should be printed on the console.Run the program through Node.js. 

//Example:
//Input	   Output
//1235     false
//25368    true
//123456   false 