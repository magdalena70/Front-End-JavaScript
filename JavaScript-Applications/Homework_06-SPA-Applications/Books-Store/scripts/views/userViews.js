var app = app || {};

app.userViews = (function () {

    function showNotification(text) {
        $('#notification')
            .text(text)
            .on('click', function () {
                $(this).hide();
            })
            .hide().show(2000);
    }

    function showStartPage(selector) {
        $.get('templates/startPage.html', function (template) {
            $(selector).html(template).hide().show(2000);
        });
    }

    function showRegisterPage(selector) {
        $.get('templates/register.html', function (template) {
            $(selector).html(template).hide().show(2000);

            $('#registerBtn').on('click', function (ev) {
                var username = $('#username').val(),
                    password = $('#pass').val(),
                    confirmPassword = $('#confirmPass').val();

                if (username && username != false &&
                    password && password != false &&
                    confirmPassword && confirmPassword != false &&
                    password === confirmPassword) {

                    Sammy(function () {
                        this.trigger('register', { username: username, password: password });
                    });
                } else {
                    showNotification('Invalid value. Username and password can not be empty.');
                    throw new Error('Invalid value. Username and password can not be empty.');
                }
            });
        });
    }

    function showLoginPage(selector) {
        $.get('templates/login.html', function (template) {
            $(selector).html(template).hide().show(2000);

            $('#loginBtn').on('click', function (ev) {
                var username = $('#username').val(),
                    password = $('#password').val();

                if(username && username != false && password && password != false){
                    Sammy(function () {
                        this.trigger('login', { username: username, password: password });
                    });
                } else {
                    showNotification('Invalid value. Username and password can not be empty.');
                    throw new Error('Invalid value. Username and password can not be empty.');
                }
            });
        });
    }

    function showHomePage(selector) {
        $.get('templates/home.html', function (template) {
            $(selector).html(template).hide().show(2000);

            $('#listBooksByDateCreatedBtn').on('click', function () {
                Sammy(function () {
                    this.trigger('listBooksByDateCreated', null);
                });
            });

            $('#listBooksByTitleBtn').on('click', function () {
                Sammy(function () {
                    this.trigger('listBooksByTitle', null);
                });
            });

            $('#listBooksByAuthorBtn').on('click', function () {
                Sammy(function () {
                    this.trigger('listBooksByAuthor', null);
                });
            });
        });
    }

    return {
        load: function () {
            return {
                showNotification: showNotification,
                showRegisterPage: showRegisterPage,
                showLoginPage: showLoginPage,
                showHomePage: showHomePage,
                showStartPage: showStartPage
            };
        }
    };

}());