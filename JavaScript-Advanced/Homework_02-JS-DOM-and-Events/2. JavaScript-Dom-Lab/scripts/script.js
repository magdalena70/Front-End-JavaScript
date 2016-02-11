'use strict';

var btn = document.getElementById('calculate');
btn.addEventListener('click', function(){
	calculateSum('one', 'two', 'three', 'result1');
	calculateSum('four', 'five', 'six', 'result2');
	calculateSum('seven', 'eight', 'nine', 'result3');
	calculateSum('one', 'four', 'seven', 'result4');
	calculateSum('two', 'five', 'eight', 'result5');
	calculateSum('three', 'six', 'nine', 'result6');
});

function calculateSum(aId, bId, cId, showResultId){
	var numA = document.getElementById(aId).value,
		numB = document.getElementById(bId).value,
		numC = document.getElementById(cId).value,
		sum = 0,
		showResult = document.getElementById(showResultId);
	
	if( (numA && !isNaN(Number(numA))) &&
		(numB && !isNaN(Number(numB))) &&
		(numC && !isNaN(Number(numC))) ){
		
		sum = Number(numA) + Number(numB) + Number(numC);
		showResult.innerText = 'sum = ' + sum;
	} else{
		showResult.innerText = 'invalid input';
	}
}