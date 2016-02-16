var models = models || {};

(function(scope){
	function Container(title){
		if(!title || title == false){
			throw new Error('Invalid input. Title can not be empty.');
		}
		
		this._title = title;
		this._sections = [];
	}
	
	Container.prototype.addSection = function(section){
		this._sections.push(section);
	}
	
	Container.prototype.getSections = function(){
		return this._sections;
	}
	
	Container.prototype.addToDom = function(selector){
		var wrapper = document.querySelector(selector),
		container = document.createElement('div'),
		header = document.createElement('h1'),
		divSections = document.createElement('div'),
		footer = document.createElement('footer'),
		sectionInput = document.createElement('input'),
		sectionBtn = document.createElement('button'),
		_this = this;
		
		container.setAttribute('id', 'container');
		header.innerHTML = this._title;
		divSections.setAttribute('id', 'sections');
		sectionInput.type = 'text';
		sectionInput.placeholder = 'Title...';
		sectionInput.setAttribute('id', 'sectionInput');
		sectionBtn.setAttribute('id', 'sectionBtn');
		sectionBtn.innerText = 'Add section';
		
		footer.appendChild(sectionInput);
		footer.appendChild(sectionBtn);
		
		container.appendChild(header);
		container.appendChild(divSections);
		this._sections.forEach(function(section){
			section.addToDom('#sections');
		});
		container.appendChild(footer);
		
		wrapper.appendChild(container);
		
		// add eventListener
		sectionBtn.addEventListener('click', function(e){
			var sectionTitle = document.getElementById('sectionInput').value,
			section = scope.getSection(sectionTitle)
				.addToDom('#sections');
			
			_this.addSection(section);
			document.getElementById('sectionInput').value = '';
		});
	}
	
	scope.Container = Container;
	scope.getContainer = function(title){
		return new Container(title);
	}
	
}(models));