var imdb = imdb || {};

(function(scope){
	var id = 1;
	function Theatre(title, length, rating, country, isPuppet){
		scope._Movie.call(this, title, length, rating, country);
		this.isPuppet = isPuppet || false;
		this._id = id++;
	}
	
	Theatre.extend(scope._Movie);
	
	
	scope.getTheatre = function(title, length, rating, country, isPuppet){
		return new Theatre(title, length, rating, country, isPuppet);
	}
}(imdb));