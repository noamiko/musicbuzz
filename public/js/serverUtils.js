function login() {
    $.ajax({
        url: 'http://musicbuzz.azurewebsites.net/login_user',
        type: 'POST',
        data: {'firstName': $("#firstName").val()},
        success: function(data) {
            alert(data);
        }
    });
}

function sign_up_user() {
    $.post("/signup_user",
            {
                "firstName": $("#firstName").val(),
                "lastName": $("#lastName").val(),
                "userName": $("#userName").val(),
                "email": $("#email").val(),
                "password": $("#password").val(),
                "geolocation": $("#geolocation").val(),
                "gender": $("#gender").val(),
                "birthDate": $("#birthDate").val(),
                "country": $("#country").val()
            },
    function(data, status) {
        if (data === true){
            changePage("sign_up_user","login_to_host");
        }else{
            alert("A user with the same email is already registerd");
        }
        clear_inputs();
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