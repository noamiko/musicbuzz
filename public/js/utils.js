function init() {
    $('#sign_up_user').hide();
    $('#sign_up_host').hide();
    $('#login_to_host').hide();
    $('#feed').hide();
    $('#search').hide();
    $('#login').show();
    
}


function clear_inputs() {
    inputs = document.getElementsByTagName('input');
    for (i = 0; i < inputs.length; i++) {
        var typo = inputs[i].type;
        if (typo === 'text' || typo === 'email' || typo === 'password' || typo === 'date'){
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

function display_list(songList, divId) {
    container = document.getElementById(divId);
    for (var i = 0; i < songList.length; i++) {
        //The button representing the song
        songList[i].dome = document.createElement("button");
        songList[i].dome.setAttribute("class", "song-button ui-btn ui-shadow ui-corner-all");

        songList[i].dome.setAttribute("type", "button");
        songList[i].dome.setAttribute("data-role", "button");
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


function display_vote_song_list(songList, divId) {

    for (var i = 0; i < songList.length; i++) {

        $("#" + divId).append("<div id=" + divId + "-row-" + i + " class='song-row'></div>");
        container = document.getElementById(divId + "-row-" + i);
        //the vote like button
        songList[i].dome = document.createElement("button");
        songList[i].dome.setAttribute("class", "vote-good-button ui-btn ui-shadow ui-corner-all");
        songList[i].dome.setAttribute("type", "button");
        songList[i].dome.setAttribute("data-role", "button");
        songList[i].dome.setAttribute("data-icon", "check");
        songList[i].dome.setAttribute("onclick", "like("+songList[i]._id+")");
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
        songList[i].dome.setAttribute("onclick", "dislike("+songList[i]._id+")");
        songList[i].dome.setAttribute("data-icon", "delete");
        songList[i].dome.innerHTML = "<h3><br></h3><br>";
        container.appendChild(songList[i].dome);
    }
}


function getGeoLocation() {
//    if (navigator.geolocation)
//    {
//        var lat = position.coords.latitude;
//        var lng = position.coords.longitude;
        return {"lat": 00, "lng": 00};
//    }
}

function changePage(from, to) {
    $("#" + from).hide();
    $("#" + to).show();
}