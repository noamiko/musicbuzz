function init() {
//    $('#sign_up_user').hide();
//    $('#sign_up_host').hide();
//    $('#login_to_host').hide();
//    $('#feed').hide();
//    $('#search').hide();
//    $('#login_host').hide();
//    $('#login_user').show();
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
        content += "<a href='#' class='lst_btn ui-shadow ui-btn ui-corner-all ui-btn-icon-left ui-icon-check' onclick='like(" + songList[i].id + ");'>" + songList[i].title + "</a>";
    }
    $('#' + divId).html(content);
}

function display_song(song, divId) {
    var content = "";
    $('#' + divId).html(content);
    //The button representing the song
    content += "<a href='#' class='single_song ui-btn'>" + song.title
            + "</a>";
    $('#' + divId).html(content);
}





function display_best_songs(songList, divId) {
    var content = "";
    $('#' + divId).html(content);
    if (songList !== null && songList !== "") {
        for (var i = 0; i < songList.length; i++) {
            content += "<div class='row'>"
                    + "<div data-inline='true'>"
                    + "<a href='#' class='like_btn ui-shadow ui-btn ui-corner-all ui-btn-icon-left ui-icon-check ui-btn-inline' onclick='like(" + songList[i]._id + ");'></a>"
                    + "<a href='#' class='song_btn ui-shadow ui-btn ui-btn-inline ui-corner-all'>" + songList[i].title + "</a>"
                    + "<a href='#' class='dislike_btn ui-shadow ui-btn-inline ui-btn ui-corner-all ui-btn-icon-right ui-icon-delete' onclick='dislike(" + songList[i]._id + ");'></a>"
                    + "</div>"
                    + "</div>";
        }
        $('#' + divId).html(content);
    }
}

function changePage(from, to) {
    $.mobile.pageContainer.pagecontainer('change', "#" + to, {
        transition: 'flow',
//        reload: true
    });
        $('#'+from).hide();

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

