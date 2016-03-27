var app = app || {};

app.usersViews = (function () {

    function showNotification(text) {
        $('#notification')
            .text(text)
            .on('click', function () {
                $(this).hide(2000);
            })
            .hide().show(2000);
    }

    function showRegisterPage(selector) {
        $.get('templates/register.html', function (template) {
            $(selector).empty().html(template).hide().show(2000);

            $('#register-button').on('click', function (ev) {
                var username = $('#username').val(),
                    password = $('#password').val(),
                    confirmPassword = $('#confirm-password').val();

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
            $(selector).empty().html(template).hide().show(2000);

            $('#login-button').on('click', function (ev) {
                var username = $('#username').val(),
                    password = $('#password').val();

                if (username && username != false && password && password != false) {
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

    function showLoginMenu(selector) {
        $.get('templates/menu-login.html', function (template) {
            $(selector).empty().html(template);
        });
    }

    function showHomeMenu(selector) {
        $.get('templates/menu-home.html', function (template) {
            $(selector).empty().html(template);
        });
    }

    function showWelcomeGuestPage(selector) {
        $.get('templates/welcome-guest.html', function (template) {
            $(selector).empty().html(template);
        });
    }

    function showWelcomeUserPage(selector) {
        $.get('templates/welcome-user.html', function (template) {
            var data = {username: sessionStorage['username']},
                rendered = Mustache.render(template, data);
            $(selector).empty().html(rendered);
        });
    }

    return {
        showNotification: showNotification,
        showRegisterPage: showRegisterPage,
        showLoginPage: showLoginPage,
        showLoginMenu: showLoginMenu,
        showHomeMenu: showHomeMenu,
        showWelcomeGuestPage: showWelcomeGuestPage,
        showWelcomeUserPage: showWelcomeUserPage
    };
}());