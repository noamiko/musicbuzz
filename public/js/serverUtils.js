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
        "firstName" : $("#firstName").val()
//        ,
//        "lastName" : lastName,
//        "userName" : userName,
//        "email" : email,
//        "password" : password,
//        "geolocation" : geolocation,
//        "gender" : gender,
//        "birthDate" : birthDate,
//        "country" : country
},
        function(data, status) {
        alert("Data: " + data + "\nStatus: " + status);
        });
        clear_inputs();
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