var app = app || {};

app.requester = (function () {
    function Requester(appId, appSecret) {
        this.appId = appId;
        this.appSecret = appSecret;
        this.baseUrl = 'https://baas.kinvey.com/';
    }

    Requester.prototype.makeRequest = function (method, url, data, useSession) {
        var defer = Q.defer(),
        options = {
            method: method,
            url: url,
            success: function (data) {
                defer.resolve(data);
            },
            error: function (err) {
                defer.reject(err);
            }
        },
        _this = this,
        authToken;

        $.ajaxSetup({
            beforeSend: function (xhr, settings) {
                if (useSession) {

                    if (sessionStorage.sessionAuthToken) {
                        authToken = sessionStorage.sessionAuthToken;
                        xhr.setRequestHeader('Authorization', 'Kinvey ' + authToken);
                    } else {
                        throw new Error('Invalid request');
                    }
                    
                } else {
                    authToken = _this.appId + ':' + _this.appSecret;
                    xhr.setRequestHeader('Authorization', 'Basic ' + btoa(authToken));
                }

                if (data) {
                    xhr.setRequestHeader('Content-Type', 'application/json');
                    settings.data = JSON.stringify(data);
                }
            }
        });

        $.ajax(options);

        return defer.promise;
    }

    Requester.prototype.get = function (url, useSession) {
        return this.makeRequest('GET', url, null, useSession);
    }

    Requester.prototype.post = function (url, data, useSession) {
        return this.makeRequest('POST', url, data, useSession);
    }

    Requester.prototype.put = function (url, data, useSession) {
        return this.makeRequest('PUT', url, data, useSession);
    }

    Requester.prototype.delete = function (url, useSession) {
        return this.makeRequest('DELETE', url, null, useSession);
    }

    return {
        config: function (appId, appSecret) {
            return new Requester(appId, appSecret);
        }
    };

}());