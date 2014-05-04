function start_user() {
    timer_user(function() {
        return (current_song = get_and_display_song(current_host.currentSongId, "current_song"));
    });
    next_song = get_and_display_song(current_host.nextSongId, "next_song");
    get_best_songs_and_display();
    get_song_history_and_display();
    $('#host_title').text(current_host.bizName);

}

function timer_user() {
    var time_to_refresh = current_song.length * 60 * 1000;
    setTimeout(function() {
        console.log("Timer is set to: " + time_to_refresh);
        current_host = get_host(current_host.bizName);
        start_user();
    }, time_to_refresh);
}



function refresh_user() {
    current_song = get_and_display_song(get_host(current_host.bizName).currentSongId, "current_song");
    next_song = get_and_display_song(current_host.nextSongId, "next_song");
    get_best_songs_and_display();
    get_song_history_and_display();
}