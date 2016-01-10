function divisionBy3(number){
    var sumOfDigit = 0;

    if (number > 9) {
        while (number > 0) {
            sumOfDigit += number % 10;
            number = parseInt(number / 10);
        }
    }

    if (sumOfDigit % 3 == 0) {
        console.log("the number is divided by 3 without remainder")
    } else {
        console.log("the number is not divided by 3 without remainder")
    }
}

divisionBy3(12);
divisionBy3(188);
divisionBy3(591);

//Write a JavaScript function divisionBy3(number) that finds the sum of digits
//of integer number n(n > 9) and checks if the sum is divided by 3 without remainder.
//Write JS program divisionChecker.js to check a few numbers.
//The result should be printed on the console(“the number is divided by 3 without remainder” 
//or “ the number is not divided by 3 without remainder”).Run the program through Node.js.

//Example:
//Input	      Output
// 12        the number is divided by 3 without remainder
// 188       the number is not divided by 3 without remainder
// 591       the number is divided by 3 without remainder