define(['container', 'section', 'errorMessage'], function(Container, Section, ErrorMessage){
	var Container =(function(scope){
		function Container(title){
			if(!title || title == false){
				ErrorMessage.showErrorMsg('Container\'s title can not be empty.');
				throw new Error('Container\'s title can not be empty.');
			}
			
			ErrorMessage.hideErrorMsg();
			this._title = title;
			this._sections = [];
		}
		
		Container.prototype.addSection = function(section){
			this._sections.push(section);
		}
		
		Container.prototype.getSections = function(){
			return this._sections;
		}
		
		Container.prototype.addToDom = function(parentId){
			var wrapper = document.getElementById(parentId),
				container = document.createElement('div'),
				header = document.createElement('h1'),
				footer = document.createElement('footer'),
				divSections = document.createElement('div'),
				sectionInput = document.createElement('input'),
				sectionButton = document.createElement('button'),
				_this;
		
			container.setAttribute('id', 'container');			
			header.innerText = this._title;
			divSections.setAttribute('id', 'sections');
			
			sectionInput.type = 'text';
			sectionInput.setAttribute('id', 'sectionInput');
			sectionInput.placeholder = 'Title...';
			
			sectionButton.setAttribute('id', 'sectionButton');
			sectionButton.innerHTML = 'Add Section';
			
			footer.appendChild(sectionInput);
			footer.appendChild(sectionButton);
			
			container.appendChild(header);
			container.appendChild(divSections);
			
			// Add sections in divSections
			this._sections.forEach(function(section){
				section.addToDom('sections');
			});
			
			container.appendChild(footer);
			wrapper.appendChild(container);
			
			// Add eventListener
			_this = this;
			sectionButton.addEventListener('click', function(ev){
				var sectionTitle = document.getElementById('sectionInput').value,
					section = new Section(sectionTitle);
					
				_this.addSection(section);
				section.addToDom('sections');
				document.getElementById('sectionInput').value = '';
			});
		}
		
		return Container;
	}(Container))
	
	return Container;
});
