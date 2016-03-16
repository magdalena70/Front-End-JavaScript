var app = app || {};

app.booksCollectionModel = (function () {
    function BooksCollectionModel(requester) {
        this._requester = requester;
        this.serviceUrl = requester.baseUrl + 'appdata/' + requester.appId;
    }

    BooksCollectionModel.prototype.getAllBooksByDateCreated = function () {
        return this._requester.get(this.serviceUrl + '/books?sort={"_kmd.ect":-1}', true);
    }

    BooksCollectionModel.prototype.getAllBooksByTitle = function () {
        return this._requester.get(this.serviceUrl + '/books?sort={"title":1}', true);
    }

    BooksCollectionModel.prototype.getAllBooksByAuthor = function () {
        return this._requester.get(this.serviceUrl + '/books?sort={"author":1}', true);
    }

    BooksCollectionModel.prototype.addBook = function (data) {
        return this._requester.post(this.serviceUrl + '/books', data, true);
    };

    BooksCollectionModel.prototype.editBook = function (data, bookId) {
        return this._requester.put(this.serviceUrl + '/books/' + bookId, data, true);
    };

    BooksCollectionModel.prototype.removeBook = function (bookId) {
        return this._requester.delete(this.serviceUrl + '/books/' + bookId, true);
    };

    return {
        load: function (requester) {
            return new BooksCollectionModel(requester);
        }
    };

}());