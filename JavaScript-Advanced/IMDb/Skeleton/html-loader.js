var imdb = imdb || {};

(function (scope) {
	function loadHtml(selector, data) {
		var container = document.querySelector(selector),
			moviesContainer = document.getElementById('movies'),
			detailsContainer = document.getElementById('details'),
			genresUl = loadGenres(data);

		container.appendChild(genresUl);
		var genre;
		genresUl.addEventListener('click', function (ev) {
			if (ev.target.tagName === 'LI') {
				var genreId,
					//genre,
					moviesHtml;

				genreId = parseInt(ev.target.getAttribute('data-id'));
				genre = data.filter(function (genre) {
					return genre._id === genreId;
				})[0];

				moviesHtml = loadMovies(genre.getMovies());
				moviesContainer.innerHTML = moviesHtml.outerHTML;
				moviesContainer.setAttribute('data-genre-id', genreId);
			}
		});
		
		// Task 3.1 - Add event listener for delete movie button
		moviesContainer.addEventListener('click', function(ev){
			if(ev.target.tagName === 'BUTTON'){
				ev.target.parentElement.parentElement.removeChild(ev.target.parentElement);
				genre.deleteMovieById(Number(ev.target.getAttribute('del-movie-btn-id')));
				console.log(genre._movies);
			}
		});		
		
		// Task 2 - Add event listener for movies boxes
		moviesContainer.addEventListener('click', function(ev){
			document.getElementById('details').innerHTML = '';
			
			if(ev.target.tagName === 'LI' ||
				ev.target.parentElement.tagName === 'LI' &&
				ev.target.tagName !== 'BUTTON'){
				
				var currMovieId = Number(ev.target.getAttribute('data-id') || ev.target.parentElement.getAttribute('data-id')),
				movieArr = genre.getMovies().filter(function(m){
					return m._id === currMovieId;
					}),
				movie = movieArr[0],
				movieActors = movie._actors,
				movieReviews = movie._reviews,
				actorsList = document.createElement('ul'),
				reviewsList = document.createElement('ul'),
				i;
				
				actorsList.innerHTML = '<strong>Actors</strong>';
				reviewsList.innerHTML = '<strong>Reviews</strong>';
				for(i in movieActors){
					var actorsListItem = document.createElement('li');
					
					actorsListItem.innerText = movieActors[i].name +
						'\r\nBio: ' + movieActors[i].bio +
						'\r\nBorn: ' + movieActors[i].born.toDateString();
					actorsList.appendChild(actorsListItem);
				}
				
				for(i in movieReviews){
					reviewsListItem = document.createElement('li'),
					deleteBtn = document.createElement('button');
					
					// Task 3.2 - Add event listener for delete button (delete review button)
					deleteBtn.innerText = 'Delete review ',
					deleteBtn.setAttribute('del-review-btn-id', movieReviews[i]._id);
					deleteBtn.addEventListener('click', function(ev){
						ev.target.parentElement.removeChild(ev.target.previousElementSibling);
						ev.target.parentElement.removeChild(ev.target);
						movie.deleteReviewById(Number(ev.target.getAttribute('del-review-btn-id')));
						//console.log(movie._reviews);
					});
					
					reviewsListItem.innerText = movieReviews[i].author +
						'\r\nContent: ' + movieReviews[i].content +
						'\r\nDate: ' + movieReviews[i].date.toDateString();
					reviewsList.appendChild(reviewsListItem);
					reviewsList.appendChild(deleteBtn);
				}
								
				document.getElementById('details').appendChild(actorsList);
				document.getElementById('details').appendChild(reviewsList);
			}
		});	
	}

	function loadGenres(genres) {
		var genresUl = document.createElement('ul');
		genresUl.setAttribute('class', 'nav navbar-nav');
		genres.forEach(function (genre) {
			var liGenre = document.createElement('li');
			liGenre.innerHTML = genre.name;
			liGenre.setAttribute('data-id', genre._id);
			genresUl.appendChild(liGenre);
		});

		return genresUl;
	}

	function loadMovies(movies) {
		var moviesUl = document.createElement('ul');
		movies.forEach(function (movie) {
			var liMovie = document.createElement('li'),
			deleteMovieBtn = document.createElement('button'); // Create deleteMovieBtn for task 3.1
			deleteMovieBtn.innerText = 'Delete movie';
			deleteMovieBtn.setAttribute('del-movie-btn-id', movie._id);
			
			liMovie.setAttribute('data-id', movie._id);

			liMovie.innerHTML = '<h3>' + movie.title + '</h3>';
			liMovie.innerHTML += '<div>Country: ' + movie.country + '</div>';
			liMovie.innerHTML += '<div>Time: ' + movie.length + '</div>';
			liMovie.innerHTML += '<div>Rating: ' + movie.rating + '</div>';
			liMovie.innerHTML += '<div>Actors: ' + movie._actors.length + '</div>';
			liMovie.innerHTML += '<div>Reviews: ' + movie._reviews.length + '</div>';
			
			liMovie.appendChild(deleteMovieBtn);
			moviesUl.appendChild(liMovie);
		});

		return moviesUl;
	}

	scope.loadHtml = loadHtml;
}(imdb));