function start_user() {
    current_song = get_and_display_song(current_host.currentSongId, "current_song");
    next_song = get_and_display_song(current_host.next_song, "next_song");
    get_best_songs_and_display();
    get_song_history_and_display();
}





function refresh_user() {
    current_host = get_host(current_host.bizname);

}