var models = models || {};

(function(scope){
	function Section(title){
		HtmlElem.call(this, title);
	}
	
	HtmlElem.extend(Section);
	
	Section.prototype.addToDom = function(parentId){
		var parent = document.getElementById(parentId),
		section = document.createElement('div'),
		title = document.createElement('h2'),
		ul = document.createElement('ul'),
		itemInput = document.createElement('input'),
		itemBtn = document.createElement('button'),
		_this = this;
		
		title.innerText = this._title;
		ul.setAttribute('class', 'ul');
		itemInput.type = 'text';
		itemInput.placeholder = 'Item\'s content...';
		itemInput.setAttribute('class', 'itemInput');
		itemBtn.innerText = '+';
		
		section.appendChild(title);
		section.appendChild(ul);
		this._colection.forEach(function(item){
			item.addToDom(ul);
		});
		section.appendChild(itemInput);
		section.appendChild(itemBtn);
		parent.appendChild(section);
		
		// add eventListener
		itemBtn.addEventListener('click', function(e){
			var itemContent = this.parentElement.getElementsByClassName('itemInput')[0].value,
			item = scope.getItem(itemContent),
			ul = this.parentElement.getElementsByClassName('ul')[0];
			
			item.addToDom(ul);
			this.parentElement.getElementsByClassName('itemInput')[0].value = '';
		});
		
		ul.addEventListener('change', function(e){
			if(e.target.getAttribute('class') == 'checkbox'){
				if(e.target.checked){
					e.target.parentNode.style.backgroundColor = '#90EE90';
				}else{
					e.target.parentNode.style.backgroundColor = '#FFF';
				}
			}
		});
	}
	
	scope.Section = Section;
	scope.getSection = function(title){
		return new Section(title);
	}
}(models));