var imdb = imdb || {};

(function(scope){
	var id = 1;
	function Actor(name, bio, born){
		this.name = name;
		this.bio = bio;
		this.born = born;
		this._id = id++;
	}
	
	scope.getActor = function(name, bio, born){
		return new Actor(name, bio, born);
	}
}(imdb));