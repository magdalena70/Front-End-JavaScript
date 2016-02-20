var models = models || {};

(function(scope){
	function ShoppingCart (){
		this._items = [];
	}
	
	ShoppingCart.prototype.addItem = function(item){
		this._items.push(item);
	}
	
	ShoppingCart.prototype.getTotalPrice = function(){
		var totalPrice = 0;
		this._items.forEach(function(item){
			totalPrice += item.price;
		});
		
		return totalPrice;
	}
	
	scope._ShoppingCart = ShoppingCart;
	scope.getShoppingCart  = function(){
		return new ShoppingCart ();
	}
}(models));