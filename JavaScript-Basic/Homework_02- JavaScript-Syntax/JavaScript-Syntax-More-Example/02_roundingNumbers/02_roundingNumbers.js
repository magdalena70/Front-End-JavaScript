function roundNumber(inputFloatNum) {
    var numFloor = Math.floor(inputFloatNum); //down
    var numRound = Math.round(inputFloatNum); //up
    
    console.log(inputFloatNum + " " + numFloor +"\n     " + numRound);
}

roundNumber(22.7);
roundNumber(12.3);
roundNumber(58.7);

//Write a JavaScript function roundNumber(number) that rounds floating-point number
//using Math.round(), Math.floor().Write a JS program roundingNumbers.js that rounds a few sample values.
//Run the program through Node.js.

//Examples:
//Input     Output
//22.7	     22
//           23
//12.3       12
//           12
//58.7       58
//           59