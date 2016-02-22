var models = models || {};

(function(scope){
	function Item(title){
		scope._Container.call(this, title);
	}
	
	Item.extend(scope._Container);
	
	scope.getItem = function(title){
		return new Item(title);
	}
}(models));