function start_host(host) {
    timer_host(function() {
        current_song = get_display_and_play_song(host.currentSongId, "current_song");
        return current_song;
    });
    next_song = get_and_display_song(host.nextSongId, "next_song");
    get_best_songs_and_display();
    get_song_history_and_display();
    $('#host_title').text(host.bizName);
}

function timer_host(song) {
    var time_to_refresh = song.length * 60 * 1000;
    if (time_to_refresh < 10000) time_to_refresh = 1000 * 60 * 3;
    setTimeout(function() {
        console.log("Timer is set to: " + time_to_refresh);
        choose_next_song();
        start_host(function() {
            current_host = get_host(host.bizName);
            return current_host;
        });
    }, time_to_refresh);
}

function show_player(song) {
    $('#' + 'player').html("");
    content = "<audio id='playbar' autoplay='autoplay' controls><source src=" + song.url + " type='audio/mpeg'></audio>";
    $('#' + 'player').html(content);
}

function show_youtube_player(song) {
    $('#' + 'player').html("");
    var content = "<iframe src='http://www.youtube.com/embed/" + song.id + "?rel=0&amp;autoplay=1'></iframe>";
    $('#' + 'player').html(content);
}

function refresh_host() {
    current_song = get_display_and_play_song(get_host(current_host.bizName).currentSongId, "current_song");
    next_song = get_and_display_song(current_host.nextSongId, "next_song");
    get_best_songs_and_display();
    get_song_history_and_display();
}