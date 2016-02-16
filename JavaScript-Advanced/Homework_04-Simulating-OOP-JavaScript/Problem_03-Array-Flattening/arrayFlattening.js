'use strict';

Array.prototype.flatten = function(){
	var newArr = [], _this = this;
	
	function checkArrElem(arr){
		var i, len = arr.length;
		
		for(i = 0; i < len; i++){
			if(Array.isArray(arr[i])){
				checkArrElem(arr[i]);
			}else{
				newArr.push(arr[i]);
			}
		}
	}
	
	checkArrElem(_this);
	
	return newArr;
}

var array = [1, 2, 3, 4];
console.log(array.flatten());
console.log('\r\n');
var array = [1, 2, [3, 4], [5, 6]];
console.log(array.flatten());
console.log(array); // Not changed
console.log('\r\n');
var array = [0, ["string", "values"], 5.5, [[1, 2, true], [3, 4, false]], 10];
console.log(array.flatten());