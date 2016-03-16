var app = app || {};

app.booksCollectionViews = (function () {

    function showNotification(text) {
        $('#notification')
            .text(text)
            .on('click', function () {
                $(this).hide();
            })
            .hide().show(2000);
    }

    function showAllBooks(selector, data) {
        $.get('templates/books.html', function (template) {
            var rendered = Mustache.render(template, data);
            $(selector).empty().html(rendered).hide().show(2000);
         
            $('.removeBookBtn').bind('click', function (ev) {
                var bookId = $(this).parent().attr('id');

                Sammy(function () {
                    this.trigger('removeBook', bookId);
                });

            });
        });
    }

    function showAddBookPage(selector) {
        $.get('templates/addBook.html', function (template) {
            $(selector).html(template).hide().show(2000);

            $('#addBookBtn').on('click', function (ev) {
                if ($('#bookTitle').val() != false &&
                    $('#bookAuthor').val() != false &&
                    $('#bookIsbn').val() != false) {

                    var title = $('#bookTitle').val(),
                        author = $('#bookAuthor').val(),
                        isbn = $('#bookIsbn').val(),
                        tags = $('#bookTags').val();

                    Sammy(function () {
                        this.trigger('addBook', {
                            title: title,
                            author: author,
                            isbn: isbn,
                            tags: tags ? tags.split('#').filter(function (tag) {
                                if(tag != false){
                                    return tag;
                                }
                            }).map(function (tag) {
                                return tag.trim();
                            }) : []
                        });
                    });
                } else {
                    showNotification('Invalid input. Title, author, isbn can not be empty.');
                    throw new Error('Invalid input. Title, author, isbn can not be empty.')
                }
            });
        });
    }

    function showEditBookPage(selector) {
        $.get('templates/editbook.html', function (template) {
            $(selector).html(template).hide().show(2000);
            //to do
        });
    }


    return {
        load: function () {
            return {
                showNotification: showNotification,
                showAllBooks: showAllBooks,
                showAddBookPage: showAddBookPage,
                showEditBookPage: showEditBookPage
            }
        }
    }

}());