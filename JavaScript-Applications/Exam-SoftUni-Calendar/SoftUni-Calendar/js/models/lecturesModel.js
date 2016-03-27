var app = app || {};

app.lecturesModel = (function () {
    function LecturesModel(requester) {
        this.requester = requester;
        this._serviceUrl = requester._baseUrl + 'appdata/' + requester.appKey + '/lectures';
        this._headers = requester.getHeaders(false, false, true, true);
    }

    LecturesModel.prototype.getAllLectures = function () {
        return this.requester.get(this._serviceUrl, this._headers);
    }

    LecturesModel.prototype.getLecturesByCreatorId = function (userId) {
        return this.requester.get(this._serviceUrl + '?query={"_acl.creator":"' + userId + '"}', this._headers);
    }

    LecturesModel.prototype.addLecture = function (data) {
        return this.requester.post(this._serviceUrl, this._headers, data);
    }

    LecturesModel.prototype.editLecture = function (data, lectureId) {
        return this.requester.put(this._serviceUrl + '/' + lectureId, this._headers, data);
    }

    LecturesModel.prototype.deleteLecture = function (lectureId) {
        var headers = this.requester.getHeaders(false, false, false, true);
        return this.requester.delete(this._serviceUrl + '/' + lectureId, headers);
    }

    return {
        load: function (requester) {
            return new LecturesModel(requester);
        }
    };
}());