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
    $.post('/login_host',
            {
                "email": document.forms["login_user_form"] ["email"].value,
                "pwd": document.forms["login_user_form"] ["pwd"].value,
                "lat": lat,
                "lng": lng
            },
    function(data, status) {
        if (data !== false) {
            current_host = data;
            current_user = data;
            is_a_host = true;
            changePage("login_user", "feed");
            start_host();

        } else {
            alert("Wrong email or password");
        }
        clear_inputs();
    });
}


function signup_user() {
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
            current_user = data;
            is_a_host = true;
            changePage("sign_up_host", "feed");
            start_host();

        } else {
            alert("A user with the same email is already registerd");
        }
        clear_inputs();
    });
}

//only for users, not for hosts !!!
function login_to_host() {
    $.post("/login_to_host",
            {"bizname": document.forms["login_to_host_form"] ["bizname"].value},
    function(data, status) {
        if (data !== false) {
            current_host = data;
            changePage("login_to_host", "feed");
            start_user();
        } else {
            alert("no such host exist");
        }
        clear_inputs();
    });
}

function get_host() {
    $.post("/login_to_host",
            {"bizname": document.forms["login_to_host_form"] ["bizname"].value},
    function(data, status) {
        if (data !== false) {
            current_host = data;
            return data;
        } else {
            alert("no such host exist");
        }
    });
}


function get_display_and_play_song(song_id, divId) {
    $.post("/get_song",
            {"song_id": song_id},
    function(data, status) {
        if (data !== false) {
            display_song(data, divId);
            show_player(data);
            return data;
        } else {

        }
    });
}

function get_and_display_song(song_id, divId) {
    $.post("/get_song",
            {"song_id": song_id},
    function(data, status) {
        if (data !== false) {
            display_song(data, divId);
            return data;
        } else {

        }
    });
}

function get_song_history_and_display() {
    $.post("/get_song_history",
            {"user_id": current_user._id},
    function(data, status) {
        if (data !== false) {
            history_list = data;
            display_list(history_list, "search_results");
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
    var search_input = document.forms["search_form"] ["search_text"].value;
    var keyword = encodeURIComponent(search_input);
    var yt_url = 'http://gdata.youtube.com/feeds/api/videos?q=' + keyword + '&format=5&max-results=6&v=2&alt=jsonc';

    $.get(yt_url, {}, function(response, status) {
        if (response.data.items) {
                    display_list(response.data.items, "search_results");
            } else {
                $("#search_results").html("<div id='no'>No Results found</div>");
            }
    });


//    alert("one");
//    var search_input = document.forms["search_form"] ["search_text"].value;
//    var keyword = encodeURIComponent(search_input);
//    var yt_url = 'http://gdata.youtube.com/feeds/api/videos?q=' + keyword + '&format=5&max-results=6&v=2&alt=jsonc';
//    $.ajax({
//        type: "GET",
//        url: yt_url,
//        dataType: "jsonp",
//        success: function(response) {
//                alert("two");
//            if (response.data.items) {
//                (response.data.items, function(data) {
//                        alert("tree");
//                    display_list(data, "search_results");
//                });
//            } else {
//                $("#search_results").html("<div id='no'>No Results found</div>");
//            }
//        }
//
//    });
}


function get_best_songs_and_display() {
    $.post("/get_best_songs",
            {"host_id": current_host._id},
    function(data, status) {
        if (data !== false) {
            best_songs = data;
            display_best_songs(bast_songs, "best_songs");
        } else {

        }
    });
}

function choose_next_song() {
    $.post("/choose_next_song",
            {"host_id": current_host._id},
    function(data, status) {
        if (data !== false) {
            current_host = data;
        } else {

        }
    });
}

function getGeoLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    lat = position.coords.latitude;
    lng = position.coords.longitude;
}

function add_song() {
    $.post("/add_song",
            {
                "title": document.forms["deploy_form"] ["title"].value,
                "artist": document.forms["deploy_form"] ["artist"].value,
                "length": document.forms["deploy_form"] ["length"].value,
                "url": document.forms["deploy_form"] ["url"].value
            },
    function(data, status) {

        if (data !== false) {
        } else {

        }
    });
}