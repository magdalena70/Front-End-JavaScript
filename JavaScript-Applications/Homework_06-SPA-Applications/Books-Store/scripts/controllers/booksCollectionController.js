var app = app || {};

app.booksCollectionController = (function () {
    function BooksCollectionController(model, viewBag) {
        this._model = model;
        this._viewBag = viewBag;
    }

    BooksCollectionController.prototype.showAllBooks = function (selector) {
        var _this = this, result;

        this._model.getAllBooksByDateCreated()
        .then(function (booksData) {
            result = {
                books: booksData
            };

            console.log(result);
            _this._viewBag.showAllBooks(selector, result);
            _this._viewBag.showNotification('Book\'s collection ordered by date created decsending');
        })
        .done();
    }

    BooksCollectionController.prototype.showAllBooksByTitle = function (selector) {
        var _this = this, result;

        this._model.getAllBooksByTitle()
        .then(function (booksData) {
            result = {
                books: booksData
            };

            console.log(result);
            _this._viewBag.showAllBooks(selector, result);
            _this._viewBag.showNotification('Book\'s collection ordered by book\'s title ascending');
        })
        .done();
    }

    BooksCollectionController.prototype.showAllBooksByAuthor = function (selector) {
        var _this = this, result;

        this._model.getAllBooksByAuthor()
        .then(function (booksData) {
            result = {
                books: booksData
            };

            console.log(result);
            _this._viewBag.showAllBooks(selector, result);
            _this._viewBag.showNotification('Book\'s collection ordered by author\'s name ascending');
        })
        .done();
    }

    BooksCollectionController.prototype.showAddBookPage = function (selector) {
        this._viewBag.showAddBookPage(selector);
    }

    BooksCollectionController.prototype.addBook = function (data) {
        var _this = this;

        this._model.addBook(data)
            .then(function (data) {
                _this._viewBag.showNotification('Book ' + data.title + ' has been added successfully.');
                Sammy(function () {
                    this.trigger('redirectUrl', { url: '#/home' });
                })
            })
            .done();
    };

    BooksCollectionController.prototype.showEditBookPage = function (selector) {
        this._viewBag.showEditBookPage(selector);
    }

    BooksCollectionController.prototype.removeBook = function (bookId) {
        var _this = this;

        alert('You can only remove books added by you!');
        this._model.removeBook(bookId)
            .then(function () {
                $('#' + bookId).hide();
                _this._viewBag.showNotification('Book has been removed successfully.');
            },
            function (err) {
                _this._viewBag.showNotification(err.responseText);
            })
            .done();
    }

    return {
        load: function (model, viewBag) {
            return new BooksCollectionController(model, viewBag);
        }
    };

}());