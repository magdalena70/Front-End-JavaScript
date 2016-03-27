var app = app || {};

app.lecturesController = (function () {
    function LecturesController(model, viewBag) {
        this.model = model;
        this.viewBag = viewBag;
    }

    LecturesController.prototype.loadAllLecturesPage = function (selector) {
        var _this = this;
       
        this.model.getAllLectures()
        .then(function (lectureData) {
            //console.log(lectureData);
            if (lectureData.length) {
                _this.viewBag.showModalPage(selector, lectureData);
                _this.viewBag.showAllLectures(selector, lectureData);
            } else {
                _this.viewBag.showNotification('No lectures');
            }
        },
        function (err) {
            _this.viewBag.showNotification(err.responseText);
        })
        .done();
    }

    LecturesController.prototype.loadMyLecturesPage = function (selector) {
        var _this = this;

        this.model.getLecturesByCreatorId(sessionStorage['userId'])
        .then(function (lectureData) {
            //console.log(lectureData);
            if (lectureData.length) {
                _this.viewBag.showModalPage(selector, lectureData);
                _this.viewBag.showAllLectures(selector, lectureData);
            } else {
                _this.viewBag.showNotification('No lectures');
                $(selector).empty();
            }
        },
        function (err) {
            _this.viewBag.showNotification(err.responseText);
        })
        .done();
    }

    LecturesController.prototype.loadAddLecturePage = function (selector) {
        this.viewBag.showAddLecturePage(selector);
    }

    LecturesController.prototype.addLecture = function (data) {
        var _this = this;

        this.model.addLecture(data)
            .then(function (data) {
                _this.viewBag.showNotification('Lecture ' + data.title + ' has been added successfully.');
                Sammy(function () {
                    this.trigger('redirectUrl', { url: '#/calendar/my/' });
                })
            },
            function (err) {
                _this.viewBag.showNotification(err.responseText);
            })
            .done();
    };

    LecturesController.prototype.loadEditLecturePage = function (selector, lectureId) {
        this.viewBag.showEditLecturePage(selector, lectureId);
    }

    LecturesController.prototype.editLecture = function (data, lectureId) {
        var _this = this;

        this.model.editLecture(data, lectureId)
        .then(function (lectureData) {
            _this.viewBag.showNotification('Lecture ' + lectureData.title + ' has been edited successfully');
            Sammy(function () {
                this.trigger('redirectUrl', { url: '#/calendar/my/' });
            })
        },
            function (err) {
                _this.viewBag.showNotification(err.responseText);
            })
        .done();
    }

    LecturesController.prototype.loadDeleteLecturePage = function (selector, lectureId) {
        this.viewBag.showDeleteLecturePage(selector, lectureId);
    }

    LecturesController.prototype.deleteLecture = function (lectureId) {
        var _this = this;

        this.model.deleteLecture(lectureId)
        .then(function () {
            _this.viewBag.showNotification('Lecture has been deleted successfully');
            Sammy(function () {
                this.trigger('redirectUrl', { url: '#/calendar/my/' });
            })
        },
        function (err) {
            _this.viewBag.showNotification(err.responseText);
        })
        .done();
    }

    return {
        load: function (model, viewBag) {
            return new LecturesController(model, viewBag);
        }
    };
}());