var app = app || {};

app.lecturesViews = (function () {

    function showNotification(text) {
        $('#notification')
            .text(text)
            .on('click', function () {
                $(this).hide(2000);
            })
            .hide().show(2000);
    }

    function showAllLectures(selector, data) {
        $.get('templates/calendar.html', function (template) {
            var rendered = Mustache.render(template, data);
            $(selector).empty().html(rendered).hide().show(2000);

            $('#calendar').fullCalendar({
                theme: false,
                header: {
                    left: 'prev,next today addEvent',
                    center: 'title',
                    right: 'month,agendaWeek,agendaDay'
                },
                defaultDate: '2016-01-01',
                selectable: false,
                editable: false,
                eventLimit: true,
                events: data,
                customButtons: {
                    addEvent: {
                        text: 'Add Event',
                        click: function () {
                            //TODO: redirect to add event page
                            Sammy(function () {
                                this.trigger('redirectUrl', { url: '#/calendar/add/' });
                            })
                        }
                    }
                },
                eventClick: function (calEvent, jsEvent, view) {
                    $.get('templates/modal.html', function (templ) {
                        var rendered = Mustache.render(templ, calEvent);
                        console.log(calEvent);
                        $('#modal-body').html(rendered);
                        
                        if (calEvent.lecturer !== sessionStorage['username']) {
                            $('#editLecture').hide();
                            $('#deleteLecture').hide();
                        } else {
                            $('#editLecture').show();
                            $('#deleteLecture').show();
                        }
                        
                        $('#editLecture').on('click', function () {
                            //TODO: redirect to edit event page
                            $('#events-modal').on('hidden.bs.modal', function () {
                                Sammy(function () {
                                    this.trigger('redirectUrl', { url: '#/calendar/edit/' + calEvent._id });
                                });

                                sessionStorage.title = calEvent.title;
                                sessionStorage.start = calEvent._start._i;
                                sessionStorage.end = calEvent._end._i;
                                sessionStorage.lectureId = calEvent._id;

                            });

                        });
                        $('#deleteLecture').on('click', function () {
                            //TODO: redirect to delete event page
                            $('#events-modal').on('hidden.bs.modal', function () {
                                Sammy(function () {
                                    this.trigger('redirectUrl', { url: '#/calendar/delete/' + calEvent._id });
                                });

                                sessionStorage.title = calEvent.title;
                                sessionStorage.start = calEvent._start._i;
                                sessionStorage.end = calEvent._end._i;
                                sessionStorage.lectureId = calEvent._id;
                            });
                        })
                    });
                    $('#events-modal').modal();
                }
            });
        });
    }

    function showModalPage(selector, data) {
        $.get('templates/modal.html', function (template) {
            var rendered = Mustache.render(template, data);
            $(selector).empty().html(rendered).hide().show(2000);
        });
    }

    function showAddLecturePage(selector) {
        $.get('templates/add-lecture.html', function (template) {
            $(selector).empty().html(template).hide().show(2000);

            $('#addLecture').on('click', function (ev) {
                if ($('#title').val() != false &&
                    $('#start').val() != false &&
                    $('#end').val() != false) {

                    var title = $('#title').val(),
                        start = new Date($('#start').val()),
                        end = new Date($('#end').val()),
                        lecturer = sessionStorage['username'];

                    if (start == 'Invalid Date' || end == 'Invalid Date') {
                        showNotification('Date must be in format [yyyy-MM-ddThh:mm:ss]');
                        return false;
                    } else {
                        Sammy(function () {
                            this.trigger('addLecture', {
                                title: title,
                                start: start,
                                end: end,
                                lecturer: lecturer
                            });
                        });
                    }
                } else {
                    showNotification('Invalid input. Title, start-date, end-date can not be empty.');
                    throw new Error('Invalid input. Title, start-date, end-date can not be empty.')
                }
            });
        });
    }

    function showEditLecturePage(selector, lectureId) {
        $.get('templates/edit-lecture.html', function (template) {
            var rendered = Mustache.render(template, {
                title: sessionStorage.title,
                start: sessionStorage.start,
                end: sessionStorage.end,
                _id: sessionStorage.lectureId
            });
            $(selector).empty().html(rendered).hide().show(2000);
            $('#editLecture').bind('click', function (ev) {
                if ($('#title').val() != false &&
                    $('#start').val() != false &&
                    $('#end').val() != false) {

                    var title = $('#title').val(),
                        start = new Date($('#start').val()),
                        end = new Date($('#end').val()),
                        lecturer = sessionStorage['username'];

                    if (start == 'Invalid Date' || end == 'Invalid Date') {
                        showNotification('Date must be in format [yyyy-MM-ddThh:mm:ss]');
                        return false;
                    } else {
                        Sammy(function () {
                            this.trigger('editLecture', {
                                title: title,
                                start: start,
                                end: end,
                                lecturer: lecturer
                            }, lectureId);
                        });
                    }
                } else {
                    showNotification('Invalid input. Title, start-date, end-date can not be empty.');
                    throw new Error('Invalid input. Title, start-date, end-date can not be empty.')
                }
            });
        });
    }

    function showDeleteLecturePage(selector, lectureId) {
        $.get('templates/delete-lecture.html', function (template) {
            var rendered = Mustache.render(template, {
                title: sessionStorage.title,
                start: sessionStorage.start,
                end: sessionStorage.end,
                _id: sessionStorage.lectureId
            });
            $(selector).empty().html(rendered).hide().show(2000);
            $('#deleteLecture').bind('click', function (ev) {
                Sammy(function () {
                    this.trigger('deleteLecture', lectureId);
                });
            });
        });
    }

    return {
        showNotification: showNotification,
        showAllLectures: showAllLectures,
        showModalPage: showModalPage,
        showAddLecturePage: showAddLecturePage,
        showEditLecturePage: showEditLecturePage,
        showDeleteLecturePage: showDeleteLecturePage
    };
}());