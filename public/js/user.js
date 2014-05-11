function start_user() {
    current_song = get_and_display_song(current_host.currentSongId, "current_song", true);
    next_song = get_and_display_song(current_host.nextSongId, "next_song", false);
    get_best_songs_and_display();
    get_song_history_and_display();
    $('#host_title').text(current_host.bizName);
}

function timer_user(song) {
    var time_to_refresh = song.length * 1000;
    console.log("Timer is set to: " + time_to_refresh);

    setTimeout(function() {
        current_host = get_host(current_host.bizName);
        start_user();
    }, time_to_refresh);
}



function refresh_user() {
    start_user();
}