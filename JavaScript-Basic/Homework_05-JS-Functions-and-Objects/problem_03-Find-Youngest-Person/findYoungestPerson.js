'use strict'
function findYoungestPerson(arr){
    if (arr) {
        var result = [];
        //console.log(arr);

        arr.forEach(function (elem) {
            if (elem.hasSmartphone === true) {
                result.push(elem);
            }
        });
        
        result = result.sort(function (a, b) {
            return Number(a.age) - Number(b.age);
        });

        //console.log(result);
        console.log('The youngest person is ' + result[0].firstname + ' ' + result[0].lastname);
    }
}

var people = [
    { firstname : 'George', lastname: 'Kolev', age: 32, hasSmartphone: false }, 
    { firstname : 'Vasil', lastname: 'Kovachev', age: 40, hasSmartphone: true },
    { firstname : 'Bay', lastname: 'Ivan', age: 81, hasSmartphone: true },
    { firstname : 'Baba', lastname: 'Ginka', age: 40, hasSmartphone: false }];
findYoungestPerson(people);

//output:
//The youngest person is Vasil Kovachev