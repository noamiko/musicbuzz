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

// the history list
function display_list(songList, divId) {
    $('#' + divId).html('');
    var content = "";
    for (var i = 0; i < songList.length; i++) {
        //The button representing the song
        content += "<button data-roll='button' class='button ui-btn lst_btn' data-icon='check' onclick=like('"
                + songList[i].id + "');>" + songList[i].title
                + "</button>";
    }
    $('#' + divId).html(content);
}

function display_song(song, divId) {
    var content = "";
    $('#' + divId).html(content);
    //The button representing the song
    content += "<button data-roll='button' class='button ui-btn single_song' disabled>" + song.title
            + "</button>";
    $('#' + divId).html(content);
}


function display_best_songs(songList, divId) {
    if (songList !== null && songList !== {}) {
        var content = "";
        $('#' + divId).html(content);
        for (var i = 0; i < songList.length; i++) {
            content = "<div data-role='controlgroup' data-type='horizontal' class='ui-corner-all ui-controlgroup ui-controlgroup-horizontal'>";
                    + "<div class='song-row ui-controlgroup-controls'>";
                    + "<a class='like_btn button ui-btn-check' data-role='button' data-icon='check' onclick='like('" + songList[i]._id + "');'>";
                    + "<span class='ui-btn-text'></span>";
                    + "</a>";
                    + "<a class='song_btn button ui-btn' data-role='button'>";
                    + "<span class='ui-btn-text'>" + songList[i].title + "</span>";
                    + "</a>";
                    + "<a class='dislike_btn button ui-btn-delete' data-role='button' data-icon='delete' onclick='dislike('" + songList[i]._id + "');'>";
                    + "<span class='ui-btn-text'></span>";
                    + "</a>";
                    + "</div>";
                    + "</div>";
                    + "</div>";
        }
        $('#' + divId).html(content);


//        for (var i = 0; i < songList.length; i++) {
//            $("#" + divId).append("<div data-role='controlgroup' data-type='horizontal' class='ui-corner-all ui-controlgroup ui-controlgroup-horizontal'><div class='ui-controlgroup-controls'>"
//                    + "<div id=" + divId + "-row-" + i + " class='song-row ui-controlgroup-controls'></div></div>");
//            container = document.getElementById(divId + "-row-" + i);
//            //the vote like button
//            songList[i].dome = document.createElement("a");
//            songList[i].dome.setAttribute("class", "like_btn button ui-btn-check");
//            songList[i].dome.setAttribute("data-role", "button");
//            songList[i].dome.setAttribute("data-icon", "check");
//            songList[i].dome.setAttribute("onclick", "like('" + songList[i]._id + "');");
//            songList[i].dome.innerHTML = "<span class='ui-btn-text'></span>";
////            songList[i].dome.innerHTML = "<h3>Like</h3>";
//            container.appendChild(songList[i].dome);
//
//            //The button representing the song
//            songList[i].dome = document.createElement("a");
//            songList[i].dome.setAttribute("class", "song_btn button ui-btn");
//            songList[i].dome.setAttribute("data-role", "button");
//            songList[i].dome.innerHTML = "<span class='ui-btn-text'>" + songList[i].title + "</span>";
//
////            songList[i].dome.innerHTML = "<h3>" + songList[i].title + "</h3>";
//            container.appendChild(songList[i].dome);
//
//            //the vote dislike button
//            songList[i].dome = document.createElement("a");
//            songList[i].dome.setAttribute("class", "dislike_btn button ui-btn-delete");
//            songList[i].dome.setAttribute("data-role", "button");
//            songList[i].dome.setAttribute("onclick", "dislike('" + songList[i]._id + "');");
//            songList[i].dome.setAttribute("data-icon", "delete");
//            songList[i].dome.innerHTML = "<span class='ui-btn-text'></span>";
////            songList[i].dome.innerHTML = "<h3>Dislike</h3>";
//            container.appendChild(songList[i].dome);
//        }

    }
}

function changePage(from, to) {
    $("#" + to).show();
    $.mobile.pageContainer.pagecontainer('change', "#" + to, {
        transition: 'flow',
        reload: true
    });
    $("#" + from).hide();

//
//    $('html,body').animate({scrollTop: $("#" + to).offset().top
//        , callback: $("#" + from).hide()}, 'slow');
//    $("html, body").animate({scrollTop: 0}, "slow");

}

function set_host_login_attr() {
    $('#host_btn').hide();
    $('#main_title').text("Host Login Page");
    $('#sub_title').text("");
    $('#login_btn').attr('onclick', "login_host()");
    $('#signup_btn').attr('onclick', "changePage('login_user', 'sign_up_host')");
}

function refresh_btn() {
    if (is_a_host) {
        refresh_host();
    } else {
        refresh_user();
    }
}

