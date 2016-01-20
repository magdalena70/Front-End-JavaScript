'use strict'
Array.prototype.removeItem = function (value){
    this.forEach(function (elem, index, arr) {
        if (elem === value) {
            arr.splice(index, 1);
        }
    });

    console.log(this);
}

var arr = [1, 2, 1, 4, 1, 3, 4, 1, 111, 3, 2, 1, '1'];
arr.removeItem(1);
//output: [2, 4, 3, 4, 111, 3, 2, '1']

var arr = ['hi', 'bye', 'hello'];
arr.removeItem('bye');
//output: ['hi', 'hello']