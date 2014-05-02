var current_host;
var current_user;
var current_song;
var next_song;
var history_list;
var best_songs;
var is_a_host = false;
var lat;
var lng;

var testSong = {"url": "https://copy.com/Kq6G9UxUFy4R", "length": 3.5, "artist": "TO TEST", "title": "Test more the 11 char", "id": "535079f060a6485810fd6c0b", "__v": 0};
var listOfSongs = [testSong, testSong, testSong, testSong];

function login_user() {
    var user = {
        "email": document.forms["login_user_form"] ["email"].value,
        "pwd": document.forms["login_user_form"] ["pwd"].value,
        "lat": lat,
        "lng": lng
    };
    console.log("....login_user:\n" + JSON.stringify(user));
    $.post('/login_user',
            user,
            function(data, status) {
                if (data !== false && data !== "") {
                    current_user = data;
                    changePage("login_user", "login_to_host");
                    console.log("sucsses login_user:\n" + JSON.stringify(data));
                } else {
                    console.error("!failed login_user:\n" + JSON.stringify(user) + "\nWrong email or password");
                    alert("Wrong email or password");
                }
                clear_inputs();
            });
}

function login_host() {
    var host = {
        "email": document.forms["login_user_form"] ["email"].value,
        "pwd": document.forms["login_user_form"] ["pwd"].value,
        "lat": lat,
        "lng": lng
    };
    console.log("....login_host:\n" + JSON.stringify(host));
    $.post('/login_host',
            host,
            function(data, status) {
                if (data !== false && data !== "") {
                    current_host = data;
                    current_user = data;
                    is_a_host = true;
                    changePage("login_user", "feed");
                    console.log("sucsses login_host:\n" + JSON.stringify(data));
                    start_host();

                } else {
                    console.error("!failed login_host:\n" + JSON.stringify(host) + "\nWrong email or password");
                    alert("Wrong email or password");
                }
                clear_inputs();
            });
}




function signup_user() {
    var user = {
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
    };
    console.log("....signup_user:\n" + JSON.stringify(user));

    $.post("/signup_user",
            user,
            function(data, status) {
                if (data !== false && data !== "") {
                    current_user = data;
                    changePage("sign_up_user", "login_to_host");
                    console.log("seucsses signup_user:\n" + JSON.stringify(data));

                } else {
                    console.error("!failed signup_user:\n" + JSON.stringify(user) + "\nposibly a user with the same email is already registerd");
                    alert("A user with the same email is already registerd");
                }
                clear_inputs();
            });
}




function update_user() {
    var user = {
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
    };
    console.log("....update_user:\n" + JSON.stringify(user));

    $.post("/update_user",
            user,
            function(data, status) {
                if (data !== false && data !== "") {
                    current_user = data;
                    changePage("sign_up_user", "login_to_host");
                    console.log("seucsses update_user:\n" + JSON.stringify(data));

                } else {
                    console.error("!failed update_user:\n" + JSON.stringify(user) + "\nposibly a user with the same email is already registerd");
                    alert("A user with the same email is already registerd");
                }
                clear_inputs();
            });
}


function signup_host() {
    var host = {
        "bizname": document.forms["signup_host_form"] ["bizname"].value,
        "username": document.forms["signup_host_form"] ["username"].value,
        "email": document.forms["signup_host_form"] ["email"].value,
        "pwd": document.forms["signup_host_form"] ["pwd"].value,
        "address": document.forms["signup_host_form"] ["address"].value,
        "country": document.forms["signup_host_form"] ["country"].value,
        "url": document.forms["signup_host_form"] ["url"].value,
        "lat": lat,
        "lng": lng
    };
    console.log("....signup_host: " + JSON.stringify(host));
    $.post("/signup_host",
            host,
            function(data, status) {
                if (data !== false && data !== "") {
                    current_host = data;
                    current_user = data;
                    is_a_host = true;
                    changePage("sign_up_host", "feed");
                    start_host();
                    console.log("sucsses signup_host:\n " + JSON.stringify(data));
                } else {
                    console.error("!failed signup_host:\n " + JSON.stringify(host) + "\npossibly a host with the same bizname is already registerd");
                    alert("A user with the same bizname is already registerd");
                }
                clear_inputs();
            });
}

function update_host() {
    var host = {
        "bizname": document.forms["signup_host_form"] ["bizname"].value,
        "username": document.forms["signup_host_form"] ["username"].value,
        "email": document.forms["signup_host_form"] ["email"].value,
        "pwd": document.forms["signup_host_form"] ["pwd"].value,
        "address": document.forms["signup_host_form"] ["address"].value,
        "country": document.forms["signup_host_form"] ["country"].value,
        "url": document.forms["signup_host_form"] ["url"].value,
        "lat": lat,
        "lng": lng
    };
    console.log("....update_host: " + JSON.stringify(host));
    $.post("/update_host",
            host,
            function(data, status) {
                if (data !== false && data !== "") {
                    current_host = data;
                    current_user = data;
                    is_a_host = true;
                    changePage("sign_up_host", "feed");
                    start_host();
                    console.log("sucsses update_host:\n " + JSON.stringify(data));
                } else {
                    console.error("!failed update_host:\n " + JSON.stringify(host) + "\npossibly a host with the same bizname is already registerd");
                    alert("A host with the same bizname is already registerd");
                }
                clear_inputs();
            });
}

//only for users, not for hosts !!!
function login_to_host() {
    var bizname = {"bizname": document.forms["login_to_host_form"] ["bizname"].value};
    console.log("....login_to_host: " + bizname.bizname);
    $.post("/login_to_host",
            bizname,
            function(data, status) {
                if (data !== false && data !== "") {
                    current_host = data;
                    changePage("login_to_host", "feed");
                    console.log("sucsses login_to_host:\n" + JSON.stringify(data));
                    start_user();
                } else {
                    console.error("!failed login_to_host:\n" + bizname.bizname + "\n,possibly no such host exist");
                    alert("no such host exist");
                }
                clear_inputs();
            });
}

function get_host(bizName) {
    var bizname = {"bizname": bizName};
    console.log("....get_host: " + bizname.bizname);

    $.post("/login_to_host",
            bizname,
            function(data, status) {
                if (data !== false && data !== "") {
                    current_host = data;
                    console.log("sucsses get_host:\n" + JSON.stringify(data));
                    return data;
                } else {
                    console.error("!failed get_host:\n" + bizname.bizname + "\n,possibly no such host exist");
                    alert("no such host exist");
                }
            });
}

function get_display_and_play_song(song_id, divId) {
    console.log('....get_song (from youtube) id: ' + song_id);
    $.getJSON('http://gdata.youtube.com/feeds/api/videos/' + song_id + '?v=2&alt=jsonc',
            function(data, status) {
                if (data) {
                    var song = {
                        "id": data.data.id,
                        "title": data.data.title,
                        "length": data.data.duration
                    };
                    console.log("sucsses get_song (from youtube):\n"
                            + JSON.stringify(song) + "\n"
                            + "song_id: " + song_id);
                    display_song(song, divId);
                    show_youtube_player(song);
                    timer_host(song);
                    return song;
                } else {
                    console.log("!failed get_song (from youtube):\n"
                            + "song_id: " + song_id);
                }
            });
}


//function get_display_and_play_song(song_id, divId) {
//    console.log("....get_display_and_play_song: " + song_id + " divId: " + divId);
//    $.post("/get_song",
//            {"song_id": song_id},
//    function(data, status) {
//        if (data !== false && data !== "") {
//            display_song(data, divId);
//            show_player(data);
//            console.log("sucsses get_display_and_play_song:\n" + JSON.stringify(data) + "\ndivId: " + divId);
//            timer_host(data);
//            return data;
//        } else {
//            console.error("!failed get_display_and_play_song: " + song_id + " divId: " + divId);
//        }
//    });
//}

function signout() {
    console.log("....signout: " + JSON.stringify(current_user));
    $.post("/signout",
            {
                "user_id": current_user._id,
                "host_id": current_host._id
            },
    function(data, status) {
        if (data !== false && data !== "") {
            display_song(data);
            console.log("sucsses signout:\n" + JSON.stringify(data));

            $("#feed").hide();
            $("#search").hide();
            $("#sign_up_host").hide();
            $("#sign_up_user").hide();
            $("#login_to_host").hide();
            $("#login_user").show();
        } else {
            console.error("!failed signout: " + JSON.stringify(current_user));

        }
    });
}

function get_and_display_song(song_id, divId) {
    console.log('....get_song (from youtube) id: ' + song_id);
    $.getJSON('http://gdata.youtube.com/feeds/api/videos/' + song_id + '?v=2&alt=jsonc',
            function(data, status) {
                if (data) {
                    var song = {
                        "id": data.data.id,
                        "title": data.data.title,
                        "length": data.data.duration
                    };
                    console.log("sucsses get_song (from youtube):\n"
                            + JSON.stringify(song) + "\n"
                            + "song_id: " + song_id);
                    display_song(song, divId);
                    return song;
                } else {
                    console.log("!failed get_song (from youtube):\n"
                            + "song_id: " + song_id);
                }
            });
}


//function get_and_display_song(song_id, divId) {
//    console.log("....get_and_display_song: " + song_id + " divId: " + divId);
//    $.post("/get_song",
//            {"song_id": song_id},
//    function(data, status) {
//        if (data !== false && data !== "") {
//            display_song(data, divId);
//            console.log("sucsses get_and_display_song:\n" + JSON.stringify(data) + "\ndivId: " + divId);
//            return data;
//        } else {
//            console.error("!failed get_and_display_song: " + song_id + " divId: " + divId);
//        }
//    });
//}

function get_song_history_and_display() {
    console.log("....get_song_history_and_display: " + current_user._id);

    $.post("/get_song_history",
            {"user_id": current_user._id},
    function(data, status) {

//        //to remove
//        data = listOfSongs;

        if (data !== false && data !== "") {
            history_list = data;
            display_list(history_list, "search_results");
            console.log("sucsses get_song_history_and_display:\n" + JSON.stringify(data));
        } else {
            console.error("!failed get_song_history_and_display: " + current_user._id);
        }
    });
}

function like(songId) {
    var data = {
        "host_id": current_host._id,
        "user_id": current_user._id,
        "song_id": songId
    };
    console.log("....like:\n" + JSON.stringify(data));
    $.post("/like",
            data,
            function(data, status) {
                if (data !== false && data !== "") {
                    console.log("sucsses like:\n" + JSON.stringify(data));
                } else {
                    console.error("!failed like:\n" + JSON.stringify(data));
                }
            });
}

function dislike(songId) {
    console.log("....dislike: " + songId);
    $.post("/dislike",
            {
                "host_id": current_host._id,
                "song_id": songId
            },
    function(data, status) {
        if (data !== false && data !== "") {
            console.log("sucsses dislike:\n" + JSON.stringify(data));
        } else {
            console.error("!failed dislike: " + songId);
        }
    });
}

function search_song() {
    var search_input = $("#search_text").val();
    console.log("....search song: " + search_input);
    var keyword = encodeURIComponent(search_input);
    var yt_url = 'http://gdata.youtube.com/feeds/api/videos?q=' + keyword + '&format=5&max-results=6&v=2&alt=jsonc';

    $.get(yt_url, {}, function(response, status) {
        if (response.data.items) {
            console.log("sucsess search song:\n" + JSON.stringify(response.data.items));

            display_list(response.data.items, "search_results");
        } else {
            console.error("!failed search song: " + search_input);

            $("#search_results").html("<div id='no'>No Results found</div>");
        }
    });
}

function get_best_songs_and_display() {
    console.log("..... get_best_songs_and_display: " + current_host._id);
    $.post("/get_best_songs",
            {"host_id": current_host._id},
    function(data, status) {

//        // to remove
//        data = listOfSongs;

        if (data !== false && data !== "") {
            best_songs = data;

            display_best_songs(best_songs, "best_songs");
            console.log("sucsses get_best_songs_and_display:\n" + JSON.stringify(data));

        } else {
            console.error("!failed get_best_songs_and_display: " + current_host._id);
        }
    });
}

function choose_next_song() {
    console.log("..... choose_next_song: " + current_host._id);
    $.post("/choose_next_song",
            {"host_id": current_host._id},
    function(data, status) {
        if (data !== false && data !== "") {
            current_host = data;
            console.log("sucsses choose_next_song:\n" + JSON.stringify(data));
        } else {
            console.error("!failed choose_next_song: " + current_host._id);
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

//function add_song() {
//    var song = {
//        "title": document.forms["deploy_form"] ["title"].value,
//        "length": document.forms["deploy_form"] ["length"].value,
//        "url": document.forms["deploy_form"] ["url"].value
//    };
//    $.post("/add_song",
//            song,
//            function(data, status) {
//
//                if (data !== false && data !== "") {
//                } else {
//
//                }
//            });
//}