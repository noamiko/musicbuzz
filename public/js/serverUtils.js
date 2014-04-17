var current_host;
var current_user;
var current_song;
var next_song;
var history_list;
var best_songs;
var is_a_host = false;

function login_user() {
    $.post('/login_user',
            {
                "email": $("#login_user_form input[name=email]").val(),
                "pwd": $("#login_user_form input[name=pwd]").val(),
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
                "email": $("#login_host_form input[name=email]").val(),
                "pwd": $("#login_host_form input[name=pwd]").val(),
                "geolocation": getGeoLocation()

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
    alert(document.forms["signup_user_form"] ["firstname"].value);
    $.post("/signup_user",
            {
                "firstname": document.forms["signup_user_form"] ["firstname"].value,
                "lastname": $("#signup_user_form input[name=lastname]").val(),
                "username": $("#signup_user_form input[name=username]").val(),
                "email": $("#signup_user_form input[name=email]").val(),
                "pwd": $("#signup_user_form input[name=pwd]").val(),
                "geolocation": getGeoLocation(),
                "gender": $("#signup_user_form input[name=gender]").val(),
                "birthdate": $("#signup_user_form input[name=birthdate]").val(),
                "country": $("#signup_user_form input[name=country]").val()
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
                "bizname": $("#signup_host_form input[name=bizname]").val(),
                "username": $("#signup_host_form input[name=username]").val(),
                "email": $("#signup_host_form input[name=email]").val(),
                "pwd": $("#signup_host_form input[name=pwd]").val(),
                "address": $("#signup_host_form input[name=address]").val(),
                "country": $("#signup_host_form input[name=country]").val(),
                "url": $("#signup_host_form input[name=url]").val(),
                "geolocation": getGeoLocation()
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