var models = models || {};

(function(scope){
	function Container(title){
		HtmlElem.call(this, title);
	}
	
	HtmlElem.extend(Container);
	
	Container.prototype.addToDom = function(parentId){
		var parent = document.getElementById(parentId),
		container = document.createElement('div'),
		title = document.createElement('h1')
		divSections = document.createElement('div'),
		footer = document.createElement('footer'),
		sectionInput = document.createElement('input'),
		sectionBtn = document.createElement('button'),
		_this = this;
		
		container.setAttribute('id', 'container');
		title.innerText = this._title;
		divSections.setAttribute('id', 'sections');
		sectionInput.type = 'text';
		sectionInput.placeholder = 'Title...';
		sectionInput.setAttribute('id', 'sectionInput');
		sectionBtn.setAttribute('id', 'sectionBtn');
		sectionBtn.innerText = 'Add section';
		
		footer.appendChild(sectionInput);
		footer.appendChild(sectionBtn);
		
		container.appendChild(title);
		container.appendChild(divSections);
		this._colection.forEach(function(section){
			section.addToDom('#sections');
		});
		container.appendChild(footer);
		parent.appendChild(container);
		
		// add eventListener
		sectionBtn.addEventListener('click', function(e){
			var sectionTitle = document.getElementById('sectionInput').value,
			section = scope.getSection(sectionTitle)
				.addToDom('sections');
			document.getElementById('sectionInput').value = '';
		});
	}
	
	scope.Container = Container;
	scope.getContainer = function(title){
		return new Container(title);
	}
}(models));