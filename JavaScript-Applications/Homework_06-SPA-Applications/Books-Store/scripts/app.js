var app = app || {};

(function () {
    var router = Sammy(function () {
        var selector = '#content',
            requester = app.requester.config('kid_Z1hkqiQVyZ', 'f384535c4d4e4e0bb6082dc7132ccd83'),
            userViewBag = app.userViews.load(),
            userModel = app.userModel.load(requester),
            userController = app.userController.load(userModel, userViewBag),
            booksViewBag = app.booksCollectionViews.load(),
            booksModel = app.booksCollectionModel.load(requester),
            booksController = app.booksCollectionController.load(booksModel, booksViewBag);

        this.get('#/', function () {
            userController.showStartPage(selector);
        });

        this.get('#/home', function () {
            if (sessionStorage.sessionAuthToken) {
                userController.showHomePage(selector);
            } else {
                userController.showLoginPage(selector);
            }
        });

        this.get('#/register', function () {
            if (!sessionStorage.sessionAuthToken) {
                userController.showRegisterPage(selector);
            } else {
                userViewBag.showNotification('You already registered!');
            }
        });

        this.get('#/login', function () {
            if (!sessionStorage.sessionAuthToken) {
                userController.showLoginPage(selector);
            } else {
                userViewBag.showNotification('You already logged in!');
            }
        });

        this.get('#/logout', function () {
            userController.logout();
        });

        this.get('#/addBook', function () {
            if (sessionStorage.sessionAuthToken) {
                booksController.showAddBookPage(selector);
            } else {
                userController.showLoginPage(selector);
            }
        });

        this.get('#/editBook', function () {
            if (sessionStorage.sessionAuthToken) {
                booksController.showEditBookPage(selector);
            } else {
                userController.showLoginPage(selector);
            }
        });

        //events
        this.bind('redirectUrl', function (ev, data) {
            this.redirect(data.url);
        });

        this.bind('register', function (ev, data) {
            userController.register(data);
        });

        this.bind('login', function (ev, data) {
            userController.login(data);
        });

        this.bind('listBooksByDateCreated', function () {
            var selector = $('#books');
            booksController.showAllBooks(selector);
        });

        this.bind('listBooksByTitle', function () {
            var selector = $('#books');
            booksController.showAllBooksByTitle(selector);
        });

        this.bind('listBooksByAuthor', function () {
            var selector = $('#books');
            booksController.showAllBooksByAuthor(selector);
        });

        this.bind('addBook', function (ev, data) {
            booksController.addBook(data);
        });

        this.bind('removeBook', function (ev, bookId) {
            booksController.removeBook(bookId);
        });
    });

    router.run('#/');
}());