'use strict';

var DomModule = (function(){
	var appendChildElement, removeChildElement,
	addHandler, addHandlerAll, retrieveAllElements;

	appendChildElement = function (parentSelector, childTag, childId, childClass, childText) {
		var parentElem = document.querySelector(parentSelector),
        childElem = document.createElement(childTag),
		childElemId = document.createAttribute("id"),
		childElemClass = document.createAttribute("class"),
		text = document.createTextNode(childText);
		
        childElemId.value = childId;
		childElem.setAttributeNode(childElemId);
		childElemClass.value = childClass;
        childElem.setAttributeNode(childElemClass);
		
        childElem.appendChild(text);
        parentElem.appendChild(childElem);
	};
	
	removeChildElement = function (parentSelector, childSelector) {
        var parentElem = document.querySelector(parentSelector),
        childElem = document.querySelector(childSelector);
		
        parentElem.removeChild(childElem);
    };
	
	addHandler = function (selector, event, callbackFunction) {
        var element = document.querySelector(selector);
		
        element.addEventListener(event, callbackFunction);
    };
	
	addHandlerAll = function (selector, event, callbackFunction) {
        var elements = document.querySelectorAll(selector),
		elem, element;
		
		for(elem in elements){
			element = elements[elem];
			element.addEventListener(event, callbackFunction);
		}        
    };
	
	retrieveAllElements = function (selector) {
        var elements = document.querySelectorAll(selector);
		
        return elements;
    };
	
	return {
        appendChildElement: appendChildElement,
        removeChildElement: removeChildElement,
        retrieveElements: retrieveAllElements,
        addHandler: addHandler,
		addHandlerAll: addHandlerAll
    };
	
}());

DomModule.appendChildElement("#wrapper", "button", "create-list", "create-btn", 'Click me to create new list');
DomModule.addHandler('button#create-list', 'click', createList);
function createList(){
	DomModule.appendChildElement("#wrapper", "button", "add-li", "create-btn", 'Click me to add new li item');
	DomModule.addHandler('button#add-li', 'click', addLiItem);
	DomModule.appendChildElement("#wrapper", "ul", "", "birds-list", "I am ul element from class \"birds-list\".");
	DomModule.removeChildElement("#wrapper","button#create-list");
}

function addLiItem(){
	var removeBtn = document.getElementById("remove-first-li"),
	retrieveElementsBtn = document.getElementById("count-elem-class-bird");
	
	if(!removeBtn){
		DomModule.appendChildElement("#wrapper", "button", "remove-first-li", "create-btn", 'Click me to remove first li item');
		DomModule.addHandler('button#remove-first-li', 'click', removeFirstLiItem);
	}
	
	if(!retrieveElementsBtn){
		DomModule.appendChildElement("#wrapper", "button", "count-elem-class-bird", "create-btn", 'Click me to count items with class "bird"');
		DomModule.addHandler('button#count-elem-class-bird', 'click', countItemsOfSameClass);
	}
	// Appends a list item to ul.birds-list
	DomModule.appendChildElement(".birds-list", "li", "", "birds", "I'm a list item in selector .birds-list. Click me.");
	DomModule.appendChildElement(".birds-list", "li", "", "birds", "I'm a list item in selector .birds-list too. Click me.");
	DomModule.appendChildElement(".birds-list", "li", "", "bird", "I'm a list item in selector .birds-list too. I'm from class \"bird\".");
	// Adds a click event to all bird list items
	DomModule.addHandlerAll("li.birds", 'click', function(){ alert("I'm a bird!")} );
}

function removeFirstLiItem(){
	// Removes the first li child from the bird list
	DomModule.removeChildElement("ul.birds-list","li:first-child"); 
}

function countItemsOfSameClass(){
	// Retrives all elements of class "bird"
	var elements = DomModule.retrieveElements(".bird");
	if(!document.getElementById("count-elem")){
	DomModule.appendChildElement("#wrapper", "div", "count-elem", "", elements.length);
	}
	document.getElementById("count-elem").innerText = elements.length;
}