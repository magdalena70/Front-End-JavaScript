'use strict';

function printArgsInfo() {
    var key, element, type;
   
    for (key in this) {
        element = this[key];
        
        if (Array.isArray(element)) {
            type = 'array';
        } else {
            type = typeof (element);
        }
        
        console.log('%s (%s)', element, type);
    }
    
    console.log();
}

var arr = [2, 3, 2.5, -110.5564, false];
printArgsInfo.call(arr);

var arr2 = ["some string", [1, 2], ["string", "array"], ["mixed", 2, false, "array"], { name: "Peter", age: 20 }];
printArgsInfo.apply(arr2);