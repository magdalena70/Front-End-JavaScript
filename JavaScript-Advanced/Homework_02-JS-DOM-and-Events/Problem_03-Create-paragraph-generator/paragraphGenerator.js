'use strict';

function createParagraph(id, text){
	var paragraph = document.createElement('p'),
	parent = document.getElementById(id);
	
	paragraph.innerText = text;
	parent.appendChild(paragraph);
}

createParagraph('wrapper', 'Some text');

