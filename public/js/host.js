function start_host() {
    current_song = get_display_and_play_song(current_host.currentSongId, "current_song");
    next_song = get_and_display_song(current_host.nextSongId, "next_song");
    get_best_songs_and_display();
    get_song_history_and_display();
    $('#host_title').text(current_host.bizName);
}

function timer_host(song) {
    var time_to_refresh = song.length * 1000;
    setTimeout(function() {
        console.log("Timer is set to: " + time_to_refresh)
        choose_next_song();
        current_host = get_host(song.bizname);
        start_host();
    }, time_to_refresh);
}

function show_player(song) {
    $('#' + 'player').html("");
    content = "<audio id='playbar' autoplay='autoplay' controls><source src=" + song.url + " type='audio/mpeg'></audio>";
    $('#' + 'player').html(content);
}

function show_youtube_player(song) {
    var video_frame = "<iframe width='340' height='200' src='http://www.youtube.com/embed/" + song.id + "' frameborder='0' type='text/html'></iframe>";
    var final = "<div id='result'><div>" + video_frame + "</div><div id='title'></div></div>";
    $('#' + 'player').html(final);
}

function refresh_host() {
    current_song = get_display_and_play_song(get_host(current_host.bizname).currentSongId, "current_song");
    next_song = get_and_display_song(current_host.nextSongId, "next_song");
    get_best_songs_and_display();
    get_song_history_and_display();
}