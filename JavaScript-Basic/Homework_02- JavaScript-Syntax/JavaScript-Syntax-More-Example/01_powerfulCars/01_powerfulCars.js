function convertKWtoHP(inputKW) {
    //So the power conversion of kilowatts to horsepower is given by:
    //P(hp) = P(kW) / 0.745699872
    var outputHP = inputKW / 0.745699872;
    console.log(outputHP.toFixed(2));
}

convertKWtoHP(75);
convertKWtoHP(150);
convertKWtoHP(1000);


//Write a JavaScript function convertKWtoHP(number) that accepts number variable
//to convert car’ s kW into hp(horse power).Write a JS program powerfulCars.js that
//converts a few sample values to hp(see the examples below).The result should be printed
//on the console, rounded up to the second sign after the decimal point.Run the program through Node.js.

//Examples:
//Input 	Output
//75        100.58
//150       201.15
//1000      1341.02 