var app = app || {};

app.userController = (function () {
    function UserController(model, viewBag) {
        this._model = model;
        this._viewBag = viewBag;
    }

    UserController.prototype.showStartPage = function (selector) {
        this._viewBag.showStartPage(selector);
    }

    UserController.prototype.showHomePage = function (selector) {
        this._viewBag.showHomePage(selector);
    }

    UserController.prototype.showRegisterPage = function (selector) {
        this._viewBag.showRegisterPage(selector);
    }

    UserController.prototype.register = function (data) {
        var _this = this;

        this._model.register(data)
            .then(function (successData) {
                //console.log(successData);
                _this._viewBag.showNotification('Hello, ' + successData.username + ' !');
                sessionStorage['sessionAuthToken'] = successData._kmd.authtoken;
                sessionStorage['userId'] = successData._id;

                Sammy(function () {
                    this.trigger('redirectUrl', { url: '#/home' });
                });
            })
            .done();
    }

    UserController.prototype.showLoginPage = function (selector) {
        this._viewBag.showLoginPage(selector);
    }

    UserController.prototype.login = function (data) {
        var _this = this;

        this._model.login(data)
            .then(function (successData) {
                _this._viewBag.showNotification('Hello, ' + successData.username + ' !');
                sessionStorage.sessionAuthToken = successData._kmd.authtoken;
                sessionStorage.userId = successData._id;

                Sammy(function () {
                    this.trigger('redirectUrl', { url: '#/home' });
                });
            })
            .done();
    }

    UserController.prototype.logout = function () {
        var _this = this;

        if (sessionStorage.sessionAuthToken) {
            this._model.logout()
                .then(function () {
                    sessionStorage.clear();
                    location.reload();
                })
                .done();
        } else {
            _this._viewBag.showNotification('Please login or register');
            Sammy(function () {
                this.trigger('redirectUrl', { url: '#/' });
            });
        }
    }

    return {
        load: function (model, viewBag) {
            return new UserController(model, viewBag);
        }
    };

}());