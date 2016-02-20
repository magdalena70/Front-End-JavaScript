var models = models || {};

(function(scope){
	function User(username, fullName, balance, shoppingCart){
		this.username = username;
		this.fullName = fullName;
		this._balance = balance || 0;
		this._shoppingCart = new scope._ShoppingCart();
	}
	
	User.prototype.addItemToCart = function(item){
		this._shoppingCart.addItem(item);
	}
	
	scope.getUser  = function(username, fullName, balance, shoppingCart){
		return new User (username, fullName, balance, shoppingCart);
	}
}(models));