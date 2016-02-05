function printArgsInfo() {
    var key, element, type;
    for (key in arguments) {
        element = arguments[key];
        
        if (Array.isArray(element)) {
            type = 'array';
        } else {
            type = typeof (element);
        }

        console.log('%s (%s)', element, type);
    }

    console.log();
}

printArgsInfo(2, 3, 2.5, -110.5564, false);
/*output:
2 (number)
3 (number)
2.5 (number)
-110.5564 (number)
false (boolean)*/

printArgsInfo(null, undefined, "", 0, [], {});
/*output:
null (object)
undefined (undefined)
(string)
0 (number)
(array)
[object Object] (object)*/

printArgsInfo([1, 2], ["string", "array"], ["single value"]);
/*output:
1,2 (array)
string,array (array)
single value (array)*/

printArgsInfo("some string", [1, 2], ["string", "array"], ["mixed", 2, false, "array"], { name: "Peter", age: 20 });
/*output:
some string (string)
1,2 (array)
string,array (array)
mixed,2,false,array (array)
[object Object] (object)*/

printArgsInfo([[1, [2, [3, [4, 5]]]], ["string", "array"]]);
/*1,2,3,4,5,string,array (array)*/