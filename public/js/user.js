function start_user() {
    current_song = get_and_display_song(current_host.currentSongId, "current_song");
    next_song = get_and_display_song(current_host.nextSongId, "next_song");
    get_best_songs_and_display();
    get_song_history_and_display();
    $('#host_title').text(current_host.bizname);

    timer_user();
}

function timer_user() {
    var time_to_refresh = current_song.length * 1000;
    setTimeout(function() {
        current_host = get_host(current_host.bizname);
        start_host();
    }, time_to_refresh);
}



function refresh_user() {
    current_song = get_and_display_song(get_host(current_host.bizname).currentSongId, "current_song");
    next_song = get_and_display_song(current_host.nextSongId, "next_song");
    get_best_songs_and_display();
    get_song_history_and_display();
}