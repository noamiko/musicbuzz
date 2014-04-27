function init() {
//    $('#sign_up_user').hide();
//    $('#sign_up_host').hide();
//    $('#login_to_host').hide();
//    $('#feed').hide();
//    $('#search').hide();
//    $('#login_host').hide();
//    $('#login_user').show();

    $('#menu_btn').hide();
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
        var id = "&quot;" + songList[i].id + "&quot;";
        var title = "&quot;" + songList[i].title + "&quot;";
        //The button representing the song
        content += "<a href='#' class='lst_btn ui-shadow ui-btn ui-corner-all ui-btn-icon-left ui-icon-check' onclick='like(" + id + ");'>" + short_title(songList[i].title) + "</a>";
    }
    $('#' + divId).html(content);
}

function display_song(song, divId) {
    var content = "";
    $('#' + divId).html(content);
    //The button representing the song
    content += "<a href='#' class='single_song ui-btn' onclick='alert(" + song.title + ");'>" + short_title(song.title)
            + "</a>";
    $('#' + divId).html(content);
}


function display_best_songs(songList, divId) {
    var content = "";
    $('#' + divId).html(content);
    if (songList !== null && songList !== "") {
        for (var i = 0; i < songList.length; i++) {
            var id = "&quot;" + songList[i].id + "&quot;";
            var title = "&quot;" + songList[i].title + "&quot;";
            content += "<div class='row'>"
                    + "<div data-inline='true'>"
                    + "<a href='#' class='like_btn ui-btn ui-icon-check ui-btn-icon-notext ui-corner-all ui-btn-inline' onclick='like(" + id + ");'></a>"
                    + "<a href='#' class='song_btn ui-shadow ui-btn ui-btn-inline ui-corner-all' onclick='alert(" + title + ");'>" + short_title(songList[i].title) + "</a>"
                    + "<a href='#' class='dislike_btn ui-btn ui-icon-delete ui-btn-icon-notext ui-corner-all ui-btn-inline' onclick='dislike(" + id + ");'></a>"
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
    $('#' + from).hide();

    if (from !== "search" && to === 'feed') {
        $('#home_btn').html("<a id='refresh_btn' href='#' data-icon='refresh' data-iconpos='notext' onclick='refresh_btn();'>refresh</a>");
        $('#menu_btn').show();
    }
    change_title(to);

}
function change_title(to) {
    if (to == 'feed') {
        $('#bar_title').text("Feed");
    }
    if (to == 'sign_up_user') {
        $('#bar_title').text("Sign-Up page");
    }
    if (to == 'sign_up_host') {
        $('#bar_title').text("Sign-Up page");
    }
    if (to == 'search') {
        $('#bar_title').text("Search page");
    }
}

function set_host_login_attr() {
    $('#host_btn').hide();
    $('#sub_title').text("Host Login Page");
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

function short_title(title) {
    if (title.length > 18) {
        return title.substring(0, 18) + " ..";
    } else {
        return title;
    }
}

function set_profile_user() {
    document.forms["signup_user_form"] ["firstname"].value = current_user.firstname;
    document.forms["signup_user_form"] ["lastname"].value = current_user.lastname;
    document.forms["signup_user_form"] ["username"].value = current_user.username;
    document.forms["signup_user_form"] ["email"].value = current_user.email;

    document.forms["signup_user_form"] ["gender"].value = current_user.gender;
    document.forms["signup_user_form"] ["birthdate"].value = current_user.birthdate;
    document.forms["signup_user_form"] ["country"].value = current_user.country;
    $('#signup_user_btn').attr('onclick', "update_user();");
    $('#signup_user_btn').txt("Update");



}

function set_profile_host() {
    document.forms["signup_host_form"] ["bizname"].value = current_host.bizname;
    document.forms["signup_host_form"] ["username"].value = current_host.username;
    document.forms["signup_host_form"] ["email"].value = current_host.email;

    document.forms["signup_host_form"] ["address"].value = current_host.address;
    document.forms["signup_host_form"] ["country"].value = current_host.country;
    document.forms["signup_host_form"] ["url"].value = current_host.url;
    $('#signup_user_btn').attr('onclick', "update_host();");
    $('#signup_user_btn').txt("Update");

}