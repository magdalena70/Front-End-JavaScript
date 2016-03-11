var app = app || {};

app.bookViewModel = (function(){
	function BookViewModel(model){
		this.model = model;
	}
	
	BookViewModel.prototype.showAllBooks = function(){
		var _this = this;
		this.model.collection.getAllItems(
			function(data){
				//console.log(data);
				_this.addBookToDom(data);
			},
			function(err){
				$('#notifications').text(err.responseText).show();
				console.log(err.responseText);
			});
	}
	
	BookViewModel.prototype.addBook = function(){
		var _this = this;
		if($('#bookTitle').val() && $('#bookTitle').val() != false &&
			$('#bookAuthor').val() && $('#bookAuthor').val() != false &&
			$('#bookIsbn').val() && $('#bookIsbn').val() != false){
			
			this.model.collection.addItem(
				{
					"title": $('#bookTitle').val().toLowerCase()
						.replace(/^[a-z]/g, function(letter) {
							return letter.toUpperCase();
						}),
					"author": $('#bookAuthor').val().toLowerCase()
						.replace(/\b[a-z]/g, function(letter) {
							return letter.toUpperCase();
						}),
					"isbn": $('#bookIsbn').val(),
					"tags": $('#bookTags').val()? $('#bookTags').val().split('#').filter(function(tag){
							if(tag != false){
								return tag;
							}
						}).map(function(tag){return tag = tag.trim();}): []
				},
				function(data){
					$('#bookTitle').val('');
					$('#bookAuthor').val('');
					$('#bookIsbn').val('');
					$('#bookTags').val('');
					$('#notifications').text('New book ' + data.title + ' has been added successfully!').show();
					//console.log(data);
					_this.addNewBookToDom(data);
				},
				function(err){
					$('#notifications').text(err.responseText).show();
				});
		}else{
			$('#notifications').text('Invalid input. Title, author and isbn can not be empty! Tags are optional.').show();
		}
	}
	
	BookViewModel.prototype.editBook = function(bookId, bookData){
		var newBookTitle = prompt('Update book title:', bookData.title) || bookData.title,
			newBookAuthor = prompt('Update book author:', bookData.author) || bookData.author,
			newBookIsbn = prompt('Update book ISBN:', bookData.isbn) || bookData.isbn,
			newBookTags = prompt('Update book tags:', bookData.tags? bookData.tags.join('#'):'') || bookData.tags.join('#'),
			_this = this;
	
		this.model.collection.editItem(
			bookId,
			{
				"title": newBookTitle.toLowerCase()
					.replace(/^[a-z]/g, function(letter) {
						return letter.toUpperCase();
					}),
				"author": newBookAuthor.toLowerCase()
					.replace(/\b[a-z]/g, function(letter) {
						return letter.toUpperCase();
					}),
				"isbn": newBookIsbn,
				"tags": newBookTags? newBookTags.split('#').filter(function(tag){
							if(tag != false){
								return tag;
							}
						}).map(function(tag){return tag = tag.trim();}): []
			},
			function(data){
				//console.log(data);
				$('#notifications').html('Book has been updated successfully!<br/> Old data: {<br/> title: ' +
					bookData.title + ',<br/> author: ' +
					bookData.author + ',<br/> isbn: ' +
					bookData.isbn + ',<br/> tags: [ ' + 
					bookData.tags.join(',') + ' ] }').show();
				$('.' + bookId).hide();
				_this.addNewBookToDom(data);
				
			},
			function(err){
				$('#notifications').text(err.responseText).show();
			});
	}
	
	BookViewModel.prototype.deleteBook = function(bookId){
		this.model.collection.removeItem(
			bookId,
			function(){
				$('#notifications').text('Book has been removed successfully!').show();
				$('.' + bookId).hide();
			},
			function(err){
				$('#notifications').text(err.responseText).show();
			});
	}
	
	BookViewModel.prototype.getBookById = function(bookId){
		var _this = this;
		
		this.model.collection.getItemById(
			bookId,
			function(data){
				$('#notifications').html('Book details:<br/> Title: ' + data.title +
					'<br/> Author: ' + data.author + '<br/> isbn: ' + data.isbn +
					'<br/> Date-created: ' + new Date(data._kmd.ect).toLocaleString() +
					'<br/> Last-update: ' + new Date(data._kmd.lmt).toLocaleString() +
					'<br/> Tags: [ ' + data.tags.join(',') + ' ]').show();
			},
			function(err){
				$('#notifications').text(err.responseText).show();
			});
	}
	
	BookViewModel.prototype.addNewBookToDom = function(data){
		$('#books').show();
		
		createHtmlElements(data, this);	
	}
	
	BookViewModel.prototype.addBookToDom = function(data){
		var _this = this;
		$('#books').empty().show();
		
		data.forEach(function(book){
			createHtmlElements(book, _this);
		});
	}
	
	function createHtmlElements(bookData, _this){
		var bookTags;
		
		if(bookData.title && bookData.author && bookData.isbn && bookData._id){
				var bookTitle = $('<div>').text('Title: ' + bookData.title)
					.attr('class', bookData._id)
					.appendTo($('#books')),
				bookAuthor= $('<div>').text('Author: ' + bookData.author)
					.attr('class', bookData._id)
					.appendTo($('#books')),
				bookIsbn = $('<div>').text('isbn: ' + bookData.isbn)
					.attr('class', bookData._id)
					.appendTo($('#books')),
				detailsBtn = $('<button>').text('Details')
					.attr('class', bookData._id)
					.on('click', function(){
						_this.getBookById(bookData._id);
					})
					.appendTo($('#books')),
				deleteBookBtn = $('<button>').text('X')
					.attr('class', bookData._id)
					.on('click', function(){
						_this.deleteBook(bookData._id);
					})
					.appendTo($('#books')),
				editBookBtn = $('<button>').text('Edit')
					.attr('class', bookData._id)
					.on('click', function(){
						_this.editBook(bookData._id, bookData);
					})
					.appendTo($('#books'));
			}
			
			bookTags = $('<div>').attr('class', bookData._id)
				.appendTo($('#books'));
			if(bookData.tags && bookData.tags.length){
				bookTags.text('tags: ' + bookData.tags.join(', '));
			}else{
				bookTags.text('No tags');
			}
	}
	
	return {
		loadViewModel: function(model){
			return new BookViewModel(model);
		}
	}
}());