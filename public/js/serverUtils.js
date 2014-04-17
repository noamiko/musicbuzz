var current_host;
var current_user;
var current_song;
var next_song;
var history_list;
var best_songs;


function login_user() {
    $.post('/login_user',
            {
                "email": $("#email").val(),
                "pwd": $("#pwd").val(),
                "geolocation": getGeoLocation()
            },
    function(data, status) {
        if (data !== false) {
            current_user = data;
            changePage("login_user", "login_to_host");
        } else {
            alert("Wrong email or password");
        }
        clear_inputs();
    });
}

function login_host() {
    $.post('/login_host',
            {
                "email": $("#email").val(),
                "pwd": $("#pwd").val(),
                "geolocation": getGeoLocation()

            },
    function(data, status) {
        if (data !== false) {
            current_host = data;
            changePage("login", "feed");
        } else {
            alert("Wrong email or password");
        }
        clear_inputs();
    });
}


function signup_user() {
    $.post("/signup_user",
            {
                "firstname": $("#firstname").val(),
                "lastname": $("#lastname").val(),
                "username": $("#username").val(),
                "email": $("#email").val(),
                "pwd": $("#pwd").val(),
                "geolocation": getGeoLocation(),
                "gender": $("#gender").val(),
                "birthdate": $("#birthdate").val(),
                "country": $("#country").val()
            },
    function(data, status) {
        if (data !== false) {
            current_user = data;
            changePage("sign_up_user", "login_to_host");
        } else {
            alert("A user with the same email is already registerd");
        }
        clear_inputs();
    });
}

function signup_host() {
    $.post("/signup_host",
            {
                "bizname": $("#bizname").val(),
                "username": $("#username").val(),
                "email": $("#email").val(),
                "pwd": $("#pwd").val(),
                "address": $("#address").val(),
                "country": $("#country").val(),
                "url": $("#url").val(),
                "geolocation": getGeoLocation()
            },
    function(data, status) {
        if (data !== false) {
            current_host = data;
            changePage("sign_up_host", "feed");
        } else {
            alert("A user with the same email is already registerd");
        }
        clear_inputs();
    });
}

function login_to_host() {
    $.post("/login_to_host",
            $("#bizname").val(),
            function(data, status) {
                if (data !== false) {
                    current_host = data;
                    changePage("login_to_host", "feed");
                    current_song = get_song(current_host.currentSongId);
                    next_song = get_song(current_host.nextSongId);
                    get_best_songs();
                    get_song_history();
                    refresh_displays()
                } else {
                    alert("no such host exist");
                }
                clear_inputs();
            });
}

function get_song(songId) {
    $.post("/get_song",
            song_id,
            function(data, status) {
                if (data !== false) {
                    return data;
                } else {

                }
            });
}

function get_song_history() {
    $.post("/get_song_histoey",
            current_user._id,
            function(data, status) {
                if (data !== false) {
                    history_list = data;
                } else {

                }
            });
}

function like(songId) {
    $.post("/like",
            {
                "host_id": current_host._id,
                "user_id": current_user._id,
                "song_id": songId
            },
    function(data, status) {
        if (data !== false) {

        } else {

        }
    });
}

function dislike(songId) {
    $.post("/dislike",
            {
                "host_id": current_host._id,
                "song_id": songId
            },
    function(data, status) {
        if (data !== false) {

        } else {

        }
    });
}

function search_song(songstring) {
    $.post("/search_song",
            {"host_id": ongstring},
    function(data, status) {
        if (data !== false) {
            display_list("search_results")
        } else {

        }
    });
}


function get_best_songs() {
    $.post("/get_best_songs",
            {"host_id": current_host._id},
    function(data, status) {
        if (data !== false) {
            best_songs = data;
        } else {

        }
    });
}