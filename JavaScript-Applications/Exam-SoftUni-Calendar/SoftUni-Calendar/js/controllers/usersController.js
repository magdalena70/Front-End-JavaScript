var app = app || {};

app.usersController = (function () {
    function UsersController(model, viewBag) {
        this.model = model;
        this.viewBag = viewBag;
    }

    function setCurrentUserData(data) {
        if (!sessionStorage['sessionAuthToken']) {
            sessionStorage['sessionAuthToken'] = data._kmd.authtoken;
        }
        if (!sessionStorage['userId']) {
            sessionStorage['userId'] = data._id;
        }
        if (!sessionStorage['username']) {
            sessionStorage['username'] = data.username;
        }
    }

    function getCurrentUserData() {
        var currUserData = {};

        if (sessionStorage['sessionAuthToken']) {
            currUserData.authtoken = sessionStorage['sessionAuthToken'];
        }
        if (sessionStorage['userId']) {
            currUserData.id = sessionStorage['userId'];
        }
        if (sessionStorage['username']) {
            currUserData.username = sessionStorage['username'];
        }

        return currUserData;
    }

    UsersController.prototype.loadRegisterPage = function (selector) {
        this.viewBag.showRegisterPage(selector);
    }

    UsersController.prototype.register = function (data) {
        var _this = this;

        this.model.register(data)
            .then(function (userData) {
                console.log(userData);
                _this.viewBag.showNotification('Hello, ' + userData.username + ' !');
                setCurrentUserData(userData);

                Sammy(function () {
                    this.trigger('redirectUrl', { url: '#/' });
                    location.reload();
                });
            },
            function (err) {
                _this.viewBag.showNotification(err.responseText);
            })
            .done();
    }

    UsersController.prototype.loadLoginPage = function (selector) {
        this.viewBag.showLoginPage(selector);
    }

    UsersController.prototype.login = function (data) {
        var _this = this;

        this.model.login(data)
            .then(function (userData) {
                _this.viewBag.showNotification('Hello, ' + userData.username + ' !');
                setCurrentUserData(userData);

                Sammy(function () {
                    this.trigger('redirectUrl', { url: '#/' });
                    location.reload();
                });
            },
            function (err) {
                _this.viewBag.showNotification(err.responseText);
            })
            .done();
    }

    UsersController.prototype.loadLoginMenu = function (selector) {
        this.viewBag.showLoginMenu(selector);
    }

    UsersController.prototype.loadHomeMenu = function (selector) {
        this.viewBag.showHomeMenu(selector);
    }

    UsersController.prototype.loadWelcomeGuestPage = function (selector) {
        this.viewBag.showWelcomeGuestPage(selector);
    }

    UsersController.prototype.loadWelcomeUserPage = function (selector) {
        this.viewBag.showWelcomeUserPage(selector);
    }

    UsersController.prototype.logout = function () {
        var _this = this;

        if (sessionStorage['sessionAuthToken']) {
            this.model.logout()
                .then(function () {
                    sessionStorage.clear();
                    location.reload();
                },
                function (err) {
                    _this.viewBag.showNotification(err.responseText);
                })
                .done();
        } else {
            _this.viewBag.showNotification('Please login or register');
            Sammy(function () {
                this.trigger('redirectUrl', { url: '#/' });
            });
        }
    }

    return {
        load: function (model, viewBag) {
            return new UsersController(model, viewBag);
        }
    };
}());