var imdb = imdb || {};

(function(scope){
	var id = 1;
	function Review(author, content, date){
		this.author = author;
		this.content = content;
		this.date = date;
		this._id = id++;
	}
	
	scope.getReview = function(author, content, date){
		return new Review(author, content, date);
	}
}(imdb));