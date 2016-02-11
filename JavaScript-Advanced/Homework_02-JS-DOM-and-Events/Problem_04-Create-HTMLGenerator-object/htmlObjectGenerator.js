'use strict';

var HTMLGen = (function(){
	function createParagraph(parentId, text){
		var parent = document.getElementById(parentId),
		child = document.createElement('p');
		
		child.innerText = text;
		parent.appendChild(child);
	}
	
	function createDiv(parentId, newClassName){
		var parent = document.getElementById(parentId),
		child = document.createElement('div');
		
		child.className = newClassName;
		parent.appendChild(child);
	}
	
	function createLink(parentId, text, url){
		var parent = document.getElementById(parentId),
		child = document.createElement('a');
		
		child.innerText = text;
		child.href = url;
		parent.appendChild(child);
	}
	
	return{
		createParagraph: createParagraph,
		createDiv: createDiv,
		createLink: createLink
	};
}());

HTMLGen.createParagraph('wrapper', 'Soft Uni');
HTMLGen.createDiv('wrapper', 'section');
HTMLGen.createLink('book', 'C# basics book', 'http://www.introprogramming.info/');