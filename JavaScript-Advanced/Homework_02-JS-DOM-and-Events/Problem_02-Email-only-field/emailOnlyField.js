'use strict';

var btn = document.getElementById('validateBtn');
btn.addEventListener('click', function (){
	var text = document.getElementById('email').value,
	emailFilter = /^([a-zA-Z0-9_\.-])+@(([a-zA-Z0-9-])+)+\.([a-zA-Z0-9]{2,4})+$/,
	result = document.getElementById('result');
	if(text){
		if (!emailFilter.test(text)) {
			result.style.color = '#fff';
			result.style.background = 'red';
		}else{
			result.style.color = '#fff';
			result.style.background = 'green';
		}
	
		result.innerText = text;
	} else{
		result.style.color = 'red';
		result.innerText = 'EMPTY';
	}
});