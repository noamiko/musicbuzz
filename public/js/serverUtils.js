var current_host;
var current_user;


function login() {
    var decider = $("#login_to").val();
    if (decider === "user") {
        login_user();
    } else {
        login_host();
    }
}

function login_user() {
    $.post('/login_user',
            {
                "email": login(),
                "password": $("#password").val(),
                "geoLocation": getGeoLocation()
            },
    function(data, status) {
        if (data !== false) {
            current_user = data;
            alert(current_user._id)
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
                "email": $("#email").val(),
                "password": $("#password").val(),
                "geoLocation": getGeoLocation()

            },
    function(data, status) {
        if (data !== false) {
            current_host = data;
            changePage("login", "feed");
        } else {
            alert("Wrong email or password");
        }
        clear_inputs();
    });
}


function signup_user() {
    $.post("/signup_user",
            {
                "firstName": $("#firstName").val(),
                "lastName": $("#lastName").val(),
                "userName": $("#userName").val(),
                "email": $("#email").val(),
                "password": $("#password").val(),
                "geolocation": getGeoLocation(),
                "gender": $("#gender").val(),
                "birthDate": $("#birthDate").val(),
                "country": $("#country").val()
            },
    function(data, status) {
        if (data !== false) {
            current_user = data;
            alert(current_user._id);
            changePage("sign_up_user", "login_to_host");
        } else {
            alert("A user with the same email is already registerd");
        }
        clear_inputs();
    });
}

function signup_host() {
    alert($("#bizName").val());
    $.post("/signup_host",
            {
                "bizName": $("#bizName").val(),
                "username": $("#userName").val(),
                "email": $("#email").val(),
                "password": $("#password").val(),
                "address": $("#address").val(),
                "country": $("#country").val(),
                "url": $("#url").val(),
                "geolocation": getGeoLocation()
            },
    function(data, status) {
        if (data !== false) {
            current_host = data;
            alert(current_host._id);
            changePage("sign_up_host", "feed");
        } else {
            alert("A user with the same email is already registerd");
        }
        clear_inputs();
    });
}


function sign_in_server(username, email, password, gender, date) {
    var geolocation = getGeoLocation();
    var userId = new object();
    var host = null;
    var user = new user(userId, username, email, password, geolocation, host, gender, date);
    return true;
}

function vote_song(adminUserId, song) {
    return true;
}