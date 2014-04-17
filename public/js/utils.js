function init() {
    get_history();
    get_currentSong();
    get_next_to_play_list();
}

function sign_in_btn() {
    var name = document.forms["signInForm"]["username"].value;
    var nameBool = validate_name(name);

    var email = document.forms["signInForm"]["email"].value;
    var emailBool = validate_email(email);

    var password = document.forms["signInForm"]["password"].value;
    var passwordBool = password.length > 7;

    var gender = $('input[name="gender"]:checked').val();
    var genderBool = validate_gender(gender);

    var date = document.forms["signInForm"]["date"].value;

    var valid = nameBool && emailBool && passwordBool && genderBool;
    if (valid) {
        var result = sign_in_server(name, email, password, gender, date);
        if (result === true) {
            change_page("feed");
        }
    }
}

function log_in_btn() {
    var name = document.forms["logInForm"]["username"].value;
    var password = document.forms["logInForm"]["password"].value;
    var result = verify_password(name, password);
    if (result === true) {
        change_page("feed");
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

function display_list(songList, divId) {
    container = document.getElementById(divId);
    for (var i = 0; i < songList.length; i++) {
        //The button representing the song
        songList[i].dome = document.createElement("button");
        songList[i].dome.setAttribute("class", "song-button ui-btn ui-shadow ui-corner-all");

        songList[i].dome.setAttribute("type", "button");
        songList[i].dome.setAttribute("data-role", "button");
        //todo !!!!
        //
        //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        songList[i].dome.setAttribute("onclick", "voteGood(" + songList[i].songId + ")");
        songList[i].dome.innerHTML = "<h3>" + songList[i].title + "</h3>" + songList[i].artist;
        container.appendChild(songList[i].dome);
    }
}

function display_song(song, divId) {
    container = document.getElementById(divId);
    song.dome = document.createElement("button");
    song.dome.setAttribute("class", "current-song-button ui-btn ui-shadow ui-corner-all");
    song.dome.setAttribute("type", "button");
    song.dome.setAttribute("data-roll", "button");
    song.dome.setAttribute("data-icon", "carat-r");
    song.dome.innerHTML = "<h3>" + song.title + "</h3>" + song.artist;
    container.appendChild(song.dome);
}


function display_host_song_list(songList, divId) {

    for (var i = 0; i < songList.length; i++) {

        $("#" + divId).append("<div id=" + divId + "-row-" + i + " class='song-row'></div>");
        container = document.getElementById(divId + "-row-" + i);
        //the vote Good button
        songList[i].dome = document.createElement("button");
        songList[i].dome.setAttribute("class", "vote-good-button ui-btn ui-shadow ui-corner-all");
        songList[i].dome.setAttribute("type", "button");
        songList[i].dome.setAttribute("data-role", "button");
        songList[i].dome.setAttribute("data-icon", "check");
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

        //the vote BAD button
        songList[i].dome = document.createElement("button");
        songList[i].dome.setAttribute("class", "vote-bad-button ui-btn ui-shadow ui-corner-all");
        songList[i].dome.setAttribute("type", "button");
        songList[i].dome.setAttribute("data-role", "button");
        songList[i].dome.setAttribute("data-icon", "delete");
        songList[i].dome.innerHTML = "<h3><br></h3><br>";
        container.appendChild(songList[i].dome);
    }
}


function get_geo() {
    if (navigator.geolocation)
        {
                var lat = position.coords.latitude;
                var lng = position.coords.longitude;
        }
}

function change_page(toPage) {
    location.hash = "#" + toPage;
}
