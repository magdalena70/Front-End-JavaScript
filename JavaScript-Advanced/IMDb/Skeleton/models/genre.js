var imdb = imdb || {};

(function(scope){
	var id = 1;
	function Genre(name){
		this.name = name;
		this._movies = [];
		this._id = id++;
	}
	
	Genre.prototype.addMovie = function(movie){
		this._movies.push(movie);
	}
	
	Genre.prototype.getMovies = function(){
		return this._movies;
	}
	
	Genre.prototype.deleteMovie = function(movie){
		this._movies = this._movies.filter(function(elem){
			return elem !== movie;
		});
	}
	
	Genre.prototype.deleteMovieById = function(movieId){
		this._movies = this._movies.filter(function(elem){
			return elem._id !== movieId;
		});
	}
	
	scope.getGenre = function(name){
		return new Genre(name);
	}
}(imdb));