function soothsayer(inputArr) {
    var numsArr = inputArr[0][parseInt(Math.random() * inputArr[0].length)];
    var langsArr = inputArr[1][parseInt(Math.random() * inputArr[1].length)];
    var citiesArr = inputArr[2][parseInt(Math.random() * inputArr[2].length)];
    var carsArr = inputArr[3][parseInt(Math.random() * inputArr[3].length)];
    console.log("You will work "+ numsArr + " years on " + langsArr +
        ".You will live in " + citiesArr + " and drive " + carsArr + "."); 
}

soothsayer([[3, 5, 2, 7, 9],
           ['Java', 'Python', 'C#', 'JavaScript', 'Ruby'],
           ['Silicon Valley', 'London', 'Las Vegas', 'Paris', 'Sofia'],
           ['BMW', 'Audi', 'Lada', 'Skoda', 'Opel']])

//Write a JavaScript function soothsayer(numsArr, langsArr, citiesArr, carsArr) that accepts
//the following parameters(source arrays): array of numbers, array of programming languages,
//array of cities, array of cars.Each array must consist of five elements.The function must return
//an array result[] that consists of one random item from each source array.Write a JS program that
//prints on the console the following output: “ You will work result[0] years on result[1].
//You will live in result[2] and drive result[3].”.Run the program through Node.js.

//Example:
//Input	
//soothsayer([[3, 5, 2, 7, 9],
//           ['Java', 'Python', 'C#', 'JavaScript', 'Ruby'],
//           ['Silicon Valley', 'London', 'Las Vegas', 'Paris', 'Sofia'],
//           ['BMW', 'Audi', 'Lada', 'Skoda', 'Opel']])   --> result = [5, JavaScript, Sofia, Opel]

//Output
// You will work 5 years on JavaScript.You will live in Sofia and drive Opel.