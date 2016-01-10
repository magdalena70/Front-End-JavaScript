function isPrime(number) {
    var isPrimeNum = true;
    for (var i = 2; i < Math.sqrt(number); i++) {
        if ( (number < 2) || (number % i == 0) ) {
            isPrimeNum = false;
        }
    }
    console.log(isPrimeNum);
}

isPrime(3);
isPrime(254);
isPrime(587);

//Write a JavaScript function isPrime(number) that checks if an integer number is prime.
//Write JS program primeChecker.js that checks if afew numbers are prime.
//The result should be printed on the console(true or false) on the console.Run the program through Node.js.

//Example:
//Input	  Output
// 7      true
// 254    false
// 587    true