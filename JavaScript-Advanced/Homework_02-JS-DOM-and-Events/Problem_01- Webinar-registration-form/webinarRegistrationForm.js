'use strict';

hide('hidden');

var checkBtn = document.getElementById('checkBtn');
checkBtn.addEventListener('click', function(){ 
	if(checkBtn.checked){
		show('hidden', 'hidden-input');
	}else{
		hide('hidden');
	}
});

function show(parentId, childrenClassName){
	var parent = document.getElementById(parentId),
	children = document.getElementsByClassName(childrenClassName),
	i;
	
	parent.style.display = 'block';
	for(i in children){
		children[i].required = true;
	}
}

function hide(parentId){
	var parent = document.getElementById(parentId);
	
		parent.style.display = 'none';
}