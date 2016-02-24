define(['container','section', 'errorMessage'], function(Container, Section, ErrorMessage){
	var Item = (function(scope){
		var count = 0;
		function Item(content){	
			if(!content || content == false){
				ErrorMessage.showErrorMsg('Item\'s content can not be empty.');
				throw new Error('Item\'s content can not be empty.');
			}
			
			ErrorMessage.hideErrorMsg();
			this._content = content;
			this._id = ++count;
			this.status = false;
		}
		
		Item.prototype.changeStatus = function changeStatus(){
			this.status = !this.status;
		}
		
		Item.prototype.addToDom = function addToDom(parent){
			var item = document.createElement('li'),
			checkbox = document.createElement('input'),
			label = document.createElement('label');
			
			checkbox.type = 'checkbox';
			checkbox.setAttribute('class', 'checkbox');
			checkbox.setAttribute('id', 'checkboxBtn' + this._id);
			label.innerText = this._content;
			label.setAttribute('for', 'checkboxBtn' + this._id);
			
			item.appendChild(checkbox);
			item.appendChild(label);
			parent.appendChild(item);
		}
		
		return Item;
	}(Container));
	
	return Item;
});