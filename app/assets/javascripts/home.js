$(function() {

    var $addMusic = $("#new_music"),
        $musicList = $("#music_list").find("tbody"),
        $deleteMusic = $(".music_delete"),
        $status = $(".status"),
        $noMusic = $(".no_music")
        addAPIPath = $addMusic.attr("action");

    var template = "<tr>";
        template += "<td>{{title}}</td>";
        template += "<td>{{artist}}</td>";
        template += "<td>{{year}}</td>";
        template += "<td>{{genre}}</td>";
        template += "<td><a class='music_delete' data-method='delete' href='/musics/{{id}}'>x</a></td>";
        template += "</tr>"

    var  manageStatus = function (message, doShow) {
        $status.text(message);
        doShow ? $status.fadeIn(10, "linear") : $status.fadeOut(4000, "linear");
    };

    var addSong = function (event) {
        event.preventDefault();
        event.stopImmediatePropagation();

        var song = {
            title: $("#music_title").val(),
            artist: $("#music_artist").val(),
            year: $("#music_year").val(),
            genre: $("#music_genre").val()
        };


        if(song.title == ""|| song.artist == "" || song.year == "" || song.genre == ""){
          $status.addClass('alert alert-danger');
          manageStatus("Complete the fields", true);
          return;
        }
        if(song.title.length > 40){
          $status.addClass('alert alert-danger');
          manageStatus("Invalid Title", true);
          return;
        }
        if(song.artist.length > 60){
          $status.addClass('alert alert-danger');
          manageStatus("Invalid Artist", true);
          return;
        }
        if(song.genre.length > 30){
          $status.addClass('alert alert-danger');
          manageStatus("Invalid Genre", true);
          return;
        }
        if(song.year < 1900){
          $status.addClass('alert alert-danger');
          manageStatus("Invalid Year", true);
          return;
        }

        $.ajax({
            url: addAPIPath,
            type: 'post',
            dataType: 'json',
            data: song,
            success: function (response) {
                $musicList.append(template.replace("{{title}}", response.title)
                                          .replace("{{artist}}", response.artist)
                                          .replace("{{year}}", response.year)
                                          .replace("{{genre}}", response.genre)
                                          .replace("{{id}}", response.id));


                manageStatus("Status: OK", false);
            },
            error: function (error) {
                manageStatus("Status: Request Failed", false);
            }
        });

    };

    var deleteSong = function (event) {
        event.preventDefault();
        event.stopImmediatePropagation();
        $musicList.remove();

    };

    var init = function () {
        $addMusic.submit(addSong);
        $deleteMusic.click(deleteSong);
    };

    init();

});