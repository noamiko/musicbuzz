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
    var x = {
        "email": $("#email").val(),
        "password": $("#password").val(),
        "geolocation": getGeoLocation()
    };
    alert(x);

    $.post('/login_user',
            {
                "email": $("#email").val(),
                "password": $("#password").val(),
                "geolocation": getGeoLocation()
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
    var x = {
        "email": $("#email").val(),
        "password": $("#password").val(),
        "geolocation": getGeoLocation()

    };
    alert(x);
    $.post('/login_host',
            {
                "email": $("#email").val(),
                "password": $("#password").val(),
                "geolocation": getGeoLocation()

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
    var x = {
        "firstname": $("#firstName").val(),
        "lastname": $("#lastName").val(),
        "username": $("#userName").val(),
        "email": $("#email").val(),
        "password": $("#password").val(),
        "geolocation": getGeoLocation(),
        "gender": $("#gender").val(),
        "birthdate": $("#birthDate").val(),
        "country": $("#country").val()
    };
    alert(x);
    $.post("/signup_user",
            {
                "firstname": $("#firstName").val(),
                "lastname": $("#lastName").val(),
                "username": $("#userName").val(),
                "email": $("#email").val(),
                "password": $("#password").val(),
                "geolocation": getGeoLocation(),
                "gender": $("#gender").val(),
                "birthdate": $("#birthDate").val(),
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
    var x = {
        "bizname": $("#bizName").val(),
        "username": $("#userName").val(),
        "email": $("#email").val(),
        "password": $("#password").val(),
        "address": $("#address").val(),
        "country": $("#country").val(),
        "url": $("#url").val(),
        "geolocation": getGeoLocation()
    };
    alert(x);


    $.post("/signup_host",
            {
                "bizname": $("#bizName").val(),
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