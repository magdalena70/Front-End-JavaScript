var models = models || {};

(function(scope){
	function UsedItem(title, description, price, condition){
		Item.call(this, title, description, price);
		this.condition = condition;
	}
	
	UsedItem.extend(scope._Item);
	
	scope.getUsedItem  = function(title, description, price){
		return new UsedItem (title, description, price);
	}
}(models));