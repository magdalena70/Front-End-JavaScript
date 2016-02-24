define(['container', 'section', 'item', 'errorMessage'], function(Container, Section, Item, ErrorMessage){
	var Section = (function(scope){
		function Section(title){
			if(!title || title == false){
				ErrorMessage.showErrorMsg('Section\'s title can not be empty.');
				throw new Error('Section\'s title can not be empty.');
			}
			
			ErrorMessage.hideErrorMsg();
			this._title = title;
			this._items = [];
		}
		
		Section.prototype.addItem = function addItem(item){
			this._items.push(item);
		}
		
		Section.prototype.getItems = function getItems(){
			return this._items;
		}
			
		Section.prototype.addToDom = function addToDom(parentId){
			var parentSections = document.getElementById(parentId),
				section = document.createElement('section'),
				sectionHeader = document.createElement('h2'),
				parentItems = document.createElement('ul'),
				itemInput = document.createElement('input'),
				itemButton = document.createElement('button'),
				_this;
				
			sectionHeader.innerText = this._title;
			parentItems.setAttribute('class', 'parentItems-ul');
			
			itemInput.type = 'text';
			itemInput.setAttribute('class', 'itemInput');
			itemInput.placeholder = 'Content...';
			
			itemButton.setAttribute('class', 'itemButton');
			itemButton.innerHTML = 'Add Item';
			
			section.appendChild(sectionHeader);
			section.appendChild(parentItems);
			
			// Add items in parentItems
			this._items.forEach(function(item){
				item.addToDom(parentItems);
			});
			
			section.appendChild(itemInput);
			section.appendChild(itemButton);
			
			parentSections.appendChild(section);
			
			// Add eventListener
			_this = this;
			itemButton.addEventListener('click', function(ev){
				var content = this.parentElement.getElementsByClassName('itemInput')[0].value,
					item = new Item(content),
					parentItems = this.parentElement.getElementsByClassName('parentItems-ul')[0];
				
				_this.addItem(item);
				item.addToDom(parentItems);
				this.parentElement.getElementsByClassName('itemInput')[0].value = '';
			});

			parentItems.addEventListener('change', function(ev){
				if(ev.target.getAttribute('class') == 'checkbox'){
					if(ev.target.checked){
						ev.target.parentElement.style.backgroundColor = '#66ff66';
					}else{
						ev.target.parentElement.style.backgroundColor = '#FFF';
					}
				}
			});
		}
		
		return Section;
	}(Container));
	
	return Section;
});