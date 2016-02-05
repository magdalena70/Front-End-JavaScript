'use strict';

document.getElementById('content').style.display = 'inline-block';
document.getElementById('content').style.width = '45%';

function traverse(selector){
	var element, item;
	
	function findHtmlElem(element) {
        this.htmlElem = element;
        this.indent = '';
		
		this.printElem = function printElem (indent){
			var sectionId = 'result',
			section = document.getElementById(sectionId),
			className = this.htmlElem.className,
            elemId = this.htmlElem.id,
            tagName = this.htmlElem.tagName,
            result = indent + tagName.toLowerCase() + ': ';
			if (elemId){
				result += 'id="' + elemId + '" ';
			}
			
			if (className){
				result += 'class="' + className + '"';
			}
			
			result += '<br />';
            section.innerHTML += result;
			section.style.display = 'inline-block';
			section.style.width = '45%';
		}
		
		this.getChildren = function getChildren() {
            var childrenAsHtmlElements = this.htmlElem.children,
            children = [], i, element;
			
            for (i = 0; i <= this.htmlElem.childElementCount; i++) {
                if (childrenAsHtmlElements[i]) {
                    element = new findHtmlElem(childrenAsHtmlElements[i]);
                    element.indent = this.indent + '....';
                    children.push(element);
                }
            }
            
            return children;
        };
		
		this.printChildren = function printChildren() {
            var i, children = this.getChildren();
			
            for (i in children) {
                children[i].printElem(this.indent);
                children[i].printChildren();
            }
        }		
	}
	
	element = document.querySelector(selector);
    item = new findHtmlElem(element);
    item.printChildren();
}

var selector = '.birds';
traverse(selector);