var app = app || {};

(function () {
    var ajaxRequester = app.requester.config('kid_WJDoSsBT1b', '31efe37a0f1847b99aa930cad74d48f3'),
        userModel = app.usersModel.load(ajaxRequester),
        lectureModel = app.lecturesModel.load(ajaxRequester),
        userViewBag = app.usersViews,
        lectureViewBag = app.lecturesViews,
        userController = app.usersController.load(userModel, userViewBag),
        lectureController = app.lecturesController.load(lectureModel, lectureViewBag),
        menuSelector = '#menu',
        mainSelector = '#container';

    var router = Sammy(function () {

        //this.before(function() {
            if (!window.navigator.onLine) {
                userViewBag.showNotification(constants.NO_INTERNET_CONNECTION_MSG);
                lectureViewBag.showNotification(constants.NO_INTERNET_CONNECTION_MSG);
               // return false;
            }
        //});

        this.before({ except: { path: '#\/(login\/|register\/)?' } }, function () {
            if (!sessionStorage['sessionAuthToken']) {
                this.redirect('#/');
                return false;
            }
        });

        this.get('#/', function () {
            if (sessionStorage['sessionAuthToken']) {
                userController.loadHomeMenu(menuSelector);
                userController.loadWelcomeUserPage(mainSelector);
            } else {
                userController.loadLoginMenu(menuSelector);
                userController.loadWelcomeGuestPage(mainSelector);
            }
        });

        this.get('#/register/', function () {
            userController.loadLoginMenu(menuSelector);
            userController.loadRegisterPage(mainSelector);
        });

        this.get('#/login/', function () {
            userController.loadLoginMenu(menuSelector);
            userController.loadLoginPage(mainSelector);
        });

        this.get('#/logout/', function () {
            userController.logout();
        });

        this.get('#/calendar/list/', function () {
            userController.loadHomeMenu(menuSelector);
            lectureController.loadAllLecturesPage(mainSelector);
        });

        this.get('#/calendar/my/', function () {
            userController.loadHomeMenu(menuSelector);
            lectureController.loadMyLecturesPage(mainSelector);
        });

        this.get('#/calendar/add/', function () {
            userController.loadHomeMenu(menuSelector);
            lectureController.loadAddLecturePage(mainSelector);
        });

        this.get('#/calendar/edit/:lectureId', function (context) {
            userController.loadHomeMenu(menuSelector);
            lectureController.loadEditLecturePage(mainSelector, context.params['lectureId']);
        });

        this.get('#/calendar/delete/:lectureId', function (context) {
            userController.loadHomeMenu(menuSelector);
            lectureController.loadDeleteLecturePage(mainSelector, context.params['lectureId']);
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

        this.bind('addLecture', function (ev, data) {
            lectureController.addLecture(data);
        });

        this.bind('deleteLecture', function (ev, data) {
            lectureController.deleteLecture(data);
        });

        this.bind('editLecture', function (ev, data, lectureId) {
            lectureController.editLecture(data, lectureId);
        });
    });

    router.run('#/');
}());