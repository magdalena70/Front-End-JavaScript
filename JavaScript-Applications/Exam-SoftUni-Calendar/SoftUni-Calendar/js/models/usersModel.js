var app = app || {};

app.usersModel = (function () {
    function UsersModel(requester) {
        this.requester = requester;
        this._serviceUrl = requester._baseUrl + 'user/' + requester.appKey;
    }

    UsersModel.prototype.register = function (data) {
        var headers = this.requester.getHeaders(this.requester.appKey, this.requester.appSecret, true, false);
        return this.requester.post(this._serviceUrl, headers, data);
    }

    UsersModel.prototype.login = function (data) {
        var headers = this.requester.getHeaders(this.requester.appKey, this.requester.appSecret, true, false);
        return this.requester.post(this._serviceUrl + '/login', headers, data);
    }

    UsersModel.prototype.logout = function () {
        var headers = this.requester.getHeaders(false, false, false, true);
        return this.requester.post(this._serviceUrl + '/_logout', headers, null);
    }

    return {
        load: function (requester) {
            return new UsersModel(requester);
        }
    };
}());