var models = models || {};

(function(scope){
	function Item(title){
		HtmlElem.call(this, title);
		this.status = false;
	}
	
	HtmlElem.extend(Item);
	
	Item.prototype.changeStatus = function(){
		this.status = !this.status;
	}
	
	Item.prototype.addToDom = function(parent){
		var item = document.createElement('li'),
		checkbox = document.createElement('input'),
		title = document.createElement('label');
		
		checkbox.type = 'checkbox';
		checkbox.setAttribute('class', 'checkbox');
		title.innerText = this._title;
		
		item.appendChild(checkbox);
		item.appendChild(title);
		parent.appendChild(item);
	}
	
	scope.Item = Item;
	scope.getItem = function(title){
		return new Item(title);
	}
	
}(models));