'use strict'
function arrayObjectExtractor(arr){
    if (arr) {
        //console.log(arr);
        var result = [];

        arr.forEach(function (elem) {
            if (typeof (elem) === 'object' && !Array.isArray(elem)) {
                result.push(elem);
            }
        });

        console.log(result);
    }
}

var input = [
    "Pesho",
    4,
    4.21,
    { name : 'Valyo', age : 16 },
    { type : 'fish', model : 'zlatna ribka' },
    [1, 2, 3],
    "Gosho",
    { name : 'Penka', height: 1.65 }
]
arrayObjectExtractor(input);