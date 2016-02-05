function testContext(str) {
    console.log(str + '\r\n' + this);
    //console.log(this);
}

function fromAnotherFunction(str) {
       testContext(str);
}

testContext("From the global scope ->");
fromAnotherFunction("Inside another function ->");
var asObj = new testContext("As an object ->");