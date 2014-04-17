function login() {

}

function login() {
    $.ajax({
        url: 'http://musicbuzz.azurewebsites.net/login_user',
        type: 'POST',
        data: JSON.stringify({'firstName':firstName}),
        success: function(data) {
            alert(data);
        }
    });
}

function sign_up_user() {
    $.ajax({
        url: 'http://musicbuzz.azurewebsites.net/signup_user',
        type: 'POST',
        success: function(data) {
            alert(data);
        }
    });
}

function sign_up_host() {
    $.ajax({
        url: 'http://musicbuzz.azurewebsites.net/signup_host',
        type: 'POST',
        success: function(data) {
            alert(data);
        }
    });
}

//
////function verify_password(name, password) {
//    return true;
//}
//
//function get_currentSong(adminId) {
//    display_song(song1, "current-song");
//}
//
//function get_next_to_play_list() {
//    display_host_song_list(hostSongList, "host-song-list")
//}
//
////function get_history(userId){
//function get_history() {
//    display_list(songList, "songs");
//}

function sign_in_server(username, email, password, gender, date) {
    var geolocation = getGeoLocation();
    var userId = new object();
    var host = null;
    var user = new user(userId, username, email, password, geolocation, host, gender, date);
    return true;
}

function vote_song(adminUserId, song) {
    return true;
}