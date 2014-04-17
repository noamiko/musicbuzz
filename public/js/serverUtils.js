var current_host;
var current_user;
var current_song;
var next_song;
var history_list;
var best_songs;
var is_a_host = false;
var lat;
var lng;


function login_user() {
    getGeoLocation()
    $.post('/login_user',
            {
                "email": document.forms["login_user_form"] ["email"].value,
                "pwd": document.forms["login_user_form"] ["pwd"].value,
                "lat": lat,
                "lng": lng
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
    getGeoLocation()
    $.post('/login_host',
            {
                "email": document.forms["login_host_form"] ["email"].value,
                "pwd": document.forms["login_host_form"] ["pwd"].value,
                "lat": lat,
                "lng": lng
            },
    function(data, status) {
        if (data !== false) {
            current_host = data;
            changePage("login", "feed");
            is_a_host = true;
            timer();
        } else {
            alert("Wrong email or password");
        }
        clear_inputs();
    });
}


function signup_user() {
    geolocation();
    $.post("/signup_user",
            {
                "firstname": document.forms["signup_user_form"] ["firstname"].value,
                "lastname": document.forms["signup_user_form"] ["lastname"].value,
                "username": document.forms["signup_user_form"] ["username"].value,
                "email": document.forms["signup_user_form"] ["email"].value,
                "pwd": document.forms["signup_user_form"] ["pwd"].value,
                "lat": lat,
                "lng": lng,
                "gender": document.forms["signup_user_form"] ["gender"].value,
                "birthdate": document.forms["signup_user_form"] ["birthdate"].value,
                "country": document.forms["signup_user_form"] ["country"].value
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
    getGeoLocation();
    alert(lat);
    $.post("/signup_host",
            {
                "bizname": document.forms["signup_host_form"] ["bizname"].value,
                "username": document.forms["signup_host_form"] ["username"].value,
                "email": document.forms["signup_host_form"] ["email"].value,
                "pwd": document.forms["signup_host_form"] ["pwd"].value,
                "address": document.forms["signup_host_form"] ["address"].value,
                "country": document.forms["signup_host_form"] ["country"].value,
                "url": document.forms["signup_host_form"] ["url"].value,
                "lat": lat,
                "lng": lng
            },
    function(data, status) {
        if (data !== false) {
            current_host = data;
            changePage("sign_up_host", "feed");
            is_a_host = true;
            timer();
        } else {
            alert("A user with the same email is already registerd");
        }
        clear_inputs();
    });
}

function login_to_host() {
    $.post("/login_to_host",
            {"bizname": $("#login_to_host_form input[name=hostname]").val()},
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

function get_song(song_id) {
    $.post("/get_song",
            {"song_id": song_id},
    function(data, status) {
        if (data !== false) {
            return data;
        } else {

        }
    });
}

function get_song_history() {
    $.post("/get_song_histoey",
            {"user_id": current_user._id},
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

function search_song() {
    $.post("/search_song",
            {"host_id": $("#search_text").val()},
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

function choose_next_song() {
    $.post("/choose_next_song",
            {"host_id": current_host._id},
    function(data, status) {
        if (data !== false) {
            best_songs = data;
        } else {

        }
    });
}