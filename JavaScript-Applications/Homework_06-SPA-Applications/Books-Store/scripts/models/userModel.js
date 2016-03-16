var app = app || {};

app.userModel = (function () {
    function UserModel(requester) {
        this._requester = requester;
        this.serviceUrl = requester.baseUrl + 'user/' + requester.appId;
    }

    UserModel.prototype.register = function (data) {
        return this._requester.post(this.serviceUrl, data, false);
    }

    UserModel.prototype.login = function (data) {
        return this._requester.post(this.serviceUrl + '/login', data, false);
    }

    UserModel.prototype.logout = function () {
        return this._requester.post(this.serviceUrl + '/_logout', null, true);
    }

    return {
        load: function (requester) {
            return new UserModel(requester);
        }
    };
}());