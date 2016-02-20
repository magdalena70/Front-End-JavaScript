var imdb = imdb || {};

(function(scope){
	var id = 1;
	function Movie(title, length, rating, country){
		this.title = title;
		this.length = length;
		this.rating = rating;
		this.country = country;
		this._actors  = [];
		this._reviews = [];
		this._id = id++;
	}
	
	Movie.prototype.addActor = function(actor){
		this._actors.push(actor);
	}
	
	Movie.prototype.getActors = function(){
		return this._actors;
	}
	
	Movie.prototype.addReview = function(review){
		this._reviews.push(review);
	}
	
	Movie.prototype.getReviews = function(){
		return this._reviews;
	}
	
	Movie.prototype.deleteReview = function(review){
		this._reviews = this._reviews.filter(function(elem){
			return elem !== review;
		});
	
	Movie.prototype.deleteReviewById = function(reviewId){
		this._reviews = this._reviews.filter(function(elem){
			return elem._id !== reviewId;
		});
	}
	
	scope._Movie = Movie;
	scope.getMovie = function(title, length, rating, country){
		return new Movie(title, length, rating, country);
	}
}(imdb));