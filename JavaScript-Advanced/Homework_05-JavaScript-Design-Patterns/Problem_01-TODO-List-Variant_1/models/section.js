var models = models || {};

(function(scope){
	function Section(title){
		if(!title || title == false){
			errorMessage('Section\'s title can not be empty.');
			throw new Error('Invalid input. Title can not be empty.');
		}
		
		removeErrorMessage();
		this._title = title;
		this._items = [];
	}
	
	function errorMessage(message){
		var errMess;
	
		if(!document.getElementById('errorCreateSection')){
			errMess = document.createElement('p');
			errMess.innerText = message;
			errMess.setAttribute('id', 'errorCreateSection');
			document.getElementById('sections').appendChild(errMess);
		}
		
		if(errMess){
			errMess.addEventListener('click', function(e){
				this.parentNode.removeChild(this);
			});
		}
	}
	
	function removeErrorMessage(){
		var errMess = document.getElementById('errorCreateSection');
		
		if(errMess){
			errMess.parentNode.removeChild(errMess);
		}
	}
	
	Section.prototype.addItem = function(item){
		this._items.push(item);
	}
	
	Section.prototype.getItems = function(){
		return this._items;
	}
	
	Section.prototype.addToDom = function(selector){
		var parrentSections = document.querySelector(selector),
		section = document.createElement('section'),
		sectionHeader = document.createElement('h2'),
		ul = document.createElement('ul'),
		itemInput = document.createElement('input'),
		itemBtn = document.createElement('button'),
		_this = this;
		
		sectionHeader.innerText = this._title;
		ul.setAttribute('class', 'ul');
		itemInput.type = 'text';
		itemInput.placeholder = 'Item\'s content...';
		itemInput.setAttribute('class', 'itemInput');
		itemBtn.innerText = '+';
		
		section.appendChild(sectionHeader);
		section.appendChild(ul);
		this._items.forEach(function(item){
			item.addToDom(ul);
		});
		section.appendChild(itemInput);
		section.appendChild(itemBtn);
		
		parrentSections.appendChild(section);
		
		// add eventListener
		itemBtn.addEventListener('click', function(e){
			var itemContent = this.parentElement.getElementsByClassName('itemInput')[0].value,
			item = scope.getItem(itemContent),
			ul = this.parentElement.getElementsByClassName('ul')[0];
			
			item.addToDom(ul);
			_this.addItem(item);
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