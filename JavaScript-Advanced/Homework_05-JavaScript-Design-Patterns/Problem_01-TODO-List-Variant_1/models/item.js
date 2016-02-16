var models = models || {};

(function(scope){
	var countItem = 0;
	
	function Item(content){
		if(!content || content == false){
			errorMessage('Item\'s content can not be empty.');
			throw new Error('Invalid input. Content can not be empty.');
		}
		
		removeErrorMessage();
		countItem++;
		this._content = content;
		this.status = false;
	}
	
	function errorMessage(message){
		var errMess;
	
		if(!document.getElementById('errorCreateItem')){
			errMess = document.createElement('p');
			errMess.innerText = message;
			errMess.setAttribute('id', 'errorCreateItem');
			document.getElementById('sections').appendChild(errMess);
		}
		
		if(errMess){
			errMess.addEventListener('click', function(e){
				this.parentNode.removeChild(this);
			});
		}
	}
	
	function removeErrorMessage(){
		var errMess = document.getElementById('errorCreateItem');
		
		if(errMess){
			errMess.parentNode.removeChild(errMess);
		}
	}
	
	Item.prototype.changeStatus = function(){
		this.status = !this.status;
	}
	
	Item.prototype.addToDom = function(ul){
		var item = document.createElement('li'),
		checkbox = document.createElement('input'),
		label = document.createElement('label');
		
		checkbox.type = 'checkbox';
		checkbox.setAttribute('class', 'checkbox');
		label.innerText = countItem + '. ' + this._content;
		
		item.appendChild(checkbox);
		item.appendChild(label);
		
		ul.appendChild(item);
	}
	
	scope.Item = Item;
	scope.getItem = function(content){
		return new Item(content);
	}
	
}(models));