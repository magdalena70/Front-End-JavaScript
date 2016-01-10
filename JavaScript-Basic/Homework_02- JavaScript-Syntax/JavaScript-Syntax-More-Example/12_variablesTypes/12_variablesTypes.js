function variablesTypes(arr) {
    var name = arr[0];
    var age = arr[1];
    var isMale = arr[2];
    var foods = arr[3];
    console.log("My name: " + name + " //type is " + typeof(name) + "\n" +
        "My age: " + age + " //type is " + typeof(age) + "\n" +
        "I am male: " + isMale + " //type is " + typeof(isMale) + "\n" +
        "My favorite foods are: " + foods.join(", ") + " //type is " + typeof(foods));
}

variablesTypes(['Pesho', 22, true, ['fries', 'banana', 'cake']]);


//Write a JavaScript function variablesTypes(arr) that accepts the following parameters:
//name, age, isMale(true or false), array of your favorite foods.The function must return
//the values of the variables and their types.Constrains: Use typeof() to find the type of the variables.

//Example:

//Input	                                
//variablesTypes(['Pesho', 22, true, ['fries', 'banana', 'cake']]) 
                                                                 
//Output                                                                  
//"My name: Pesho //type is string 
//My age: 22 //type is number
//I am male: true //type is boolean
//My favorite foods are: fries, banana, cake //type is object"