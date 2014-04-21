function start_host() {
    current_song = get_display_and_play_song(current_host.currentSongId,"current_song");
    next_song = get_and_display_song(current_host.nextSongId,"next_song");
    get_best_songs_and_display();
    get_song_history_and_display();
}

function timer() {
    alert(current_song.title);
    var time_to_refresh = current_song.length * 1000;
    setTimeout(function() {
        choose_next_song();
        refresh_data_and_display();
        show_player();
        //startimg a new timer for the current song
        timer();
    }, time_to_refresh);
}

function show_player() {
    content = "<audio autoplay='autoplay' controls><source src=" + current_song.url + " type='audio/mpeg'></audio>";
    $('#' + 'player').html(content);
}

function refresh_host() {
    current_host = get_host(current_host.bizname);
}