var app = app || {};

(function(){
	$('#wrapper').hide().show(3000);
	$('input').hide().show(5000);
	$('#addBookDiv').hide();
	$('#books').hide();

	// add eventListeners
	var model = app.requestModel.loadRequestModel("https://baas.kinvey.com/appdata/kid_Z1hkqiQVyZ/", "books"),
		viewModel = app.bookViewModel.loadViewModel(model);
		
	$('#showAllBooks').on('click', function(){
		$('#notifications').hide(3000);
		$('#addBookDiv').show(3000);
	
		viewModel.showAllBooks();	
	});
	
	$('#showAllBooksByTitle').on('click', function(){
		var modelByTitle = app.requestModel.loadRequestModel("https://baas.kinvey.com/appdata/kid_Z1hkqiQVyZ/", "books", "?sort={\"title\":1}"),
			viewModelByTitle = app.bookViewModel.loadViewModel(modelByTitle);
	
		$('#notifications').hide(3000);
		$('#addBookDiv').show(3000);
	
		viewModelByTitle.showAllBooks();	
	});
	
	$('#showAllBooksByAuthor').on('click', function(){
		var modelByAuthor = app.requestModel.loadRequestModel("https://baas.kinvey.com/appdata/kid_Z1hkqiQVyZ/", "books", "?sort={\"author\":1}"),
			viewModelByAuthor = app.bookViewModel.loadViewModel(modelByAuthor);
	
		$('#notifications').hide(3000);
		$('#addBookDiv').show(3000);
	
		viewModelByAuthor.showAllBooks();	
	});
	
	$('#addBook').on('click', function(){
		viewModel.addBook();
	});
	
	$('<div>').attr('id', 'notifications')
		.text('Welcome to our "Books" - REST Service')
		.attr('title', 'Click to hide message')
		.prependTo($('body'))
		.on('click', function(){
			$(this).hide(5000);
		});
	//------------------------------------
	
}());