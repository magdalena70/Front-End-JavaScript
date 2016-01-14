function createArray() {
    var someArr = new Array(20);
    
    var multipliedIndexArr = [];
    for (var index = 0;index < someArr.length;index++) {
        multipliedIndexArr[index] = index * 5;
    }
    console.log(multipliedIndexArr.join(' '));
}

createArray();

/* Write a JavaScript function createArray() that allocates array of 20 integers
 and initializes each element by its index multiplied by 5. Write JS program arrayBuilder.js
 that invokes your and prints the output at the console.
 Example:
 
 Output
 0 5 10 15 20 25 30 35 40 45 50 55 60 65 70 75 80 85 90 95     */