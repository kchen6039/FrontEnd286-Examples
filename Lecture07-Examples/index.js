$(function () {

    var maxId = localStorage.maxId;
    if (!maxId) {
        maxId = 0;
        localStorage.setItem('maxId', maxId);
    }

    var noteKeys = localStorage.noteKeys;
    if (!noteKeys) {
        noteKeys = [];
        localStorage.setItem('noteKeys', JSON.stringify(noteKeys));
    } else {
        noteKeys = JSON.parse(noteKeys);
    }



    render();


    function deleteArticle(evt) {
        var id = evt.target.id;
        noteKeys.splice(noteKeys.indexOf(id), 1);
        localStorage.noteKeys = JSON.stringify(noteKeys);
        localStorage.removeItem(id);
        render();
    }


    function render() {
        var $notes = $('#notes');
        $notes.html("");
        noteKeys.forEach(function (key) {
            var article = JSON.parse(localStorage.getItem(key));
            var $article = $('<article></article>');
            $article.attr('id', article.id);
            var $h3 = $('<h3></h3>');
            $h3.text(article.title).appendTo($article);
            var $p = $('<p></p>');
            $p.text(article.text).appendTo($article);

            $article.appendTo($notes);
            $article.click(deleteArticle);
        });
    }



    var moment = require('moment');
    $("#save-btn").click(function () {
        var article = {
            id: "note-" + (++maxId),
            title: $("#note-title").val(),
            time: moment().format(),
            text: $("#note-text").val()
        };
        noteKeys.push(article.id);
        localStorage.maxId = maxId;
        localStorage.setItem(article.id, JSON.stringify(article));
        localStorage.setItem('noteKeys', JSON.stringify(noteKeys));
        render();
    });

});