function init() {
    $('#sign_up_user').hide();
    $('#sign_up_host').hide();
    $('#login_to_host').hide();
    $('#feed').hide();
    $('#search').hide();
    $('#login_host').hide();
    $('#login_user').show();
    getGeoLocation();
}

function refresh_data_and_display() {
    current_host = login_to_host(current_host.bizname);
    current_song = get_song(current_host.currentSongId);
    next_song = get_song(current_host.nextSongId);
    get_best_songs();
    get_song_history();
    refresh_displays();
}

function refresh_displays() {
    display_best_songs(best_songs, "best_songs");
    display_song(current_song, "current_song");
    display_song(next_song, "next_song");
    display_list(history_list, "history_list");
    display_title(current_host.bizname);
}


function clear_inputs() {
    inputs = document.getElementsByTagName('input');
    for (i = 0; i < inputs.length; i++) {
        var typo = inputs[i].type;
        if (typo === 'text' || typo === 'email' || typo === 'password' || typo === 'date') {
            inputs[i].value = '';
        }
    }
}


function validate_name(name) {
    if (name === null || name === "") {
        alert("Username must be filled out");
        return false;
    }
    return true;
}

function validate_email(email) {
    var atpos = email.indexOf("@");
    var dotpos = email.lastIndexOf(".");
    if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= email.length) {
        alert("Not a valid e-mail address");
        return false;
    }
    return true;
}

function validate_gender(gender) {
    if ((gender !== "m") && (gender !== "f")) {
        alert("Not a valid gender");
        return false;
    }
    return true;
}

function display_title(title) {
    $('#host_title').text(title);
}

function display_list(songList, divId) {
    var content = "";
    for (var i = 0; i < songList.length; i++) {
        //The button representing the song
        content += "<button class='button form' style='margin: 1em;' type='button' onclick=like('"
                + songList[i]._id + "')><h3>" + songList[i].title
                + "</h3>" + songList[i].artist + "</button>";
    }
    $('#' + divId).html(content);
}

function display_song(song, divId) {
    container = document.getElementById(divId);
    song.dome = document.createElement("button");
    song.dome.setAttribute("class", "button form");
    song.dome.setAttribute("type", "button");
    song.dome.setAttribute("data-roll", "button");
    song.dome.setAttribute("data-icon", "carat-r");
    song.dome.innerHTML = "<h3>" + song.title + "</h3>" + song.artist;
    container.appendChild(song.dome);
}


function display_best_songs(songList, divId) {
    if (songList !== null) {
        for (var i = 0; i < songList.length; i++) {

            $("#" + divId).append("<div id=" + divId + "-row-" + i + " class='song-row'></div>");
            container = document.getElementById(divId + "-row-" + i);
            //the vote like button
            songList[i].dome = document.createElement("button");
            songList[i].dome.setAttribute("class", "vote-good-button ui-btn ui-shadow ui-corner-all");
            songList[i].dome.setAttribute("type", "button");
            songList[i].dome.setAttribute("data-role", "button");
            songList[i].dome.setAttribute("data-icon", "check");
            songList[i].dome.setAttribute("onclick", "like(" + songList[i]._id + ")");
            songList[i].dome.innerHTML = "<h3><br></h3><br>";
            container.appendChild(songList[i].dome);

            //The button representing the song
            songList[i].dome = document.createElement("button");
            songList[i].dome.setAttribute("class", "song-button ui-btn ui-shadow ui-corner-all");
            songList[i].dome.setAttribute("type", "button");
            songList[i].dome.setAttribute("data-role", "button");
            songList[i].dome.setAttribute("disabled", "");
            songList[i].dome.setAttribute("color", "black");
            songList[i].dome.innerHTML = "<h3>" + songList[i].title + "</h3>" + songList[i].artist;
            container.appendChild(songList[i].dome);

            //the vote dislike button
            songList[i].dome = document.createElement("button");
            songList[i].dome.setAttribute("class", "vote-bad-button ui-btn ui-shadow ui-corner-all");
            songList[i].dome.setAttribute("type", "button");
            songList[i].dome.setAttribute("data-role", "button");
            songList[i].dome.setAttribute("onclick", "dislike(" + songList[i]._id + ")");
            songList[i].dome.setAttribute("data-icon", "delete");
            songList[i].dome.innerHTML = "<h3><br></h3><br>";
            container.appendChild(songList[i].dome);
        }
    }
}

function changePage(from, to) {
    $("#" + from).hide();
    $("#" + to).show();
    if (to === 'feed' && is_a_host === true) {
        show_player();
        timer();
    }
}

function set_host_login_attr() {
    $('#host_btn').hide();
    $('#main_title').text("Host Login Page");
    $('#login_btn').attr('onclick', "login_host()");
    $('#signup_btn').attr('onclick', "changePage('login_user', 'sign_up_host')");

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