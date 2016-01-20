'use strict'
function clone(obj) {
    var objCopy = JSON.parse(JSON.stringify(obj));
    return objCopy;// a deep copy creates different object
}

function compareObjects(obj, objCopy) {
    var compare = (obj == objCopy);
    console.log('a == b --> ' + compare);
}

var a = { name: 'Pesho', age: 21 }
var b = clone(a); // a deep copy 
compareObjects(a, b);

var a = { name: 'Pesho', age: 21 };
var b = a; // not a deep copy
compareObjects(a, b);