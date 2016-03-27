var app = app || {};

app.requester = (function () {
    function Requester(appKey, appSecret) {
        this.appKey = appKey;
        this.appSecret = appSecret;
        this._baseUrl = 'https://baas.kinvey.com/';
    }

    Requester.prototype.getHeaders = function (appKey, appSecret, contentType, useSession) {
        var headers = {}, authtoken;

        if (useSession) {
            if (sessionStorage['sessionAuthToken']) {
                authtoken = sessionStorage['sessionAuthToken'];
                headers['Authorization'] = 'Kinvey ' + authtoken;
            }

        } else {
            authtoken = appKey + ':' + appSecret;
            headers['Authorization'] = 'Basic ' + btoa(authtoken);
        }

        if (contentType) {
            headers['Content-Type'] = 'application/json';
        }

        return headers;
    }

    Requester.prototype.makeRequest = function (method, url, headers, data) {
        var defer = Q.defer();

        $.ajax({
            method: method,
            url: url,
            headers: headers,
            data: JSON.stringify(data),
            success: function (data) {
                defer.resolve(data);
            },
            error: function (err) {
                defer.reject(err);
            }
        });

        return defer.promise;
    }

    Requester.prototype.get = function (url, headers) {
        return this.makeRequest('GET', url, headers, null);
    }

    Requester.prototype.post = function (url, headers, data) {
        return this.makeRequest('POST', url, headers, data);
    }

    Requester.prototype.put = function (url, headers, data) {
        return this.makeRequest('PUT', url, headers, data);
    }

    Requester.prototype.delete = function (url, headers) {
        return this.makeRequest('DELETE', url, headers, null);
    }

    return {
        config: function (appKey, appSecret) {
            return new Requester(appKey, appSecret);
        }
    };
}());