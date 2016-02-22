var models = models || {};

(function(scope){
	function Container(title){
		this._title = this.setTitle(title);
		this._items = [];
	}
	
	Container.prototype.setTitle = function(title){
		if(!title || title == false){
			throw new Error('Invalid input. Title can not be empty.');
		}
		return this._title = title;
	}
	
	Container.prototype.getTitle = function(){
		return this._title;
	}
	
	Container.prototype.addItem = function(item){
		this._items.push(item);
	}
	
	Container.prototype.getItems = function(){
		return this._items;
	}
	
	Container.prototype.addToDom = function(parentId){
		var container = document.createElement('div'),
		title = document.createElement('h2'),
		parent = document.getElementById(parentId);
		
		container.setAttribute('id', 'container');
		title.innerText = this.getTitle();
		container.appendChild(title);
		parent.appendChild(container);
	}
	
	scope._Container = Container;
	scope.getContainer = function(title){
		return new Container(title);
	}
}(models));