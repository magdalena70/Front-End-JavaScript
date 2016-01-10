function bitChecker(number) {
    var isOne = true;
    if (((number >> 3) & 1) != 1) {
        isOne = false;
    }

    console.log(isOne);
}

bitChecker(333);
bitChecker(425);
bitChecker(2567564754);

//Write a JavaScript function bitChecker(number) that finds if the bit 3 an integer number
//(counting from 0) is 1. Write JS program checkingBits.js to check a few numbers.
//The result(true or false) should be printed on the console.Run the program through Node.js.

//Example:
//Input	         Output
//333            true
//425            true
//2567564754     false