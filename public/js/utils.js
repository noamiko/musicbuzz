function init(){
    get_history();
    get_currentSong();
    get_next_to_play_list();
}

init();

function sign_in_btn(){
    var name = document.forms["signInForm"]["username"].value;
    var nameBool = validate_name(name);
    
    var email = document.forms["signInForm"]["email"].value;
    var emailBool = validate_email(email);
    
    var password = document.forms["signInForm"]["password"].value;
    var passwordBool = password.length > 7;
    
    var gender = $('input[name="gender"]:checked').val();
    var genderBool =  validate_gender(gender);

    var date =  document.forms["signInForm"]["date"].value;
    
    var valid = nameBool && emailBool && passwordBool && genderBool;
    if (valid){
        var result = sign_in_server(name,email,password,gender,date);
        if (result === true){
            change_page("feed");
        }
    }
}

function log_in_btn(){
    var name = document.forms["logInForm"]["username"].value;
    var password = document.forms["logInForm"]["password"].value;
    var result = verify_password(name,password);
    if (result === true){
        change_page("feed");
    }
}

function validate_name(name){
    if (name === null || name === ""){
      alert("Username must be filled out");
      return false;
    }
    return true;
}

function validate_email(email){
    var atpos=email.indexOf("@");
    var dotpos=email.lastIndexOf(".");
    if (atpos<1 || dotpos<atpos+2 || dotpos+2>=email.length){
      alert("Not a valid e-mail address");
      return false;
    }
    return true;
}

function validate_gender(gender){
    if ((gender !== "m") && (gender !== "f")){
        alert("Not a valid gender");
        return false;
    }
    return true;
}

function display_list(songList,divId){
    var index;
    var newDivId = "new-list-"+divId;
    $("#"+divId).append("<div id="+newDivId+">");
    for (index = 0; index < songList.length; index++){
        $("#"+newDivId).append("<button class='history-song-button' type='button' data-role='button' data-icon='carat-r'>"+
                "<h3>"+ songList[index].title +"</h3>"
                + songList[index].artist
                + "</button>");        
    }
    $("#"+newDivId).append("</div>");
    $("#"+newDivId).show();
}

function display_song(song,divId){
    var newDivId = "new-list-"+divId;
    $("#"+divId).append("<div id="+newDivId+">");
        $("#"+newDivId).append("<button class='current-song-button' type='button' data-role='button' data-icon='carat-r'>"+
                "<h3>"+ song.title +"</h3>"
                + song.artist
                + "</button>");        
    $("#"+newDivId).append("</div>");
    $("#"+newDivId).show();
}


function display_host_song_list(songList,divId){
    var index;
    var newDivId = "new-list-"+divId;
    $("#"+divId).append("<div id="+newDivId+">");
    for (index = 0; index < songList.length; index++){
        $("#"+newDivId).append("<div>"+
                
                "<button class='vote-button' type='button' data-role='button' data-icon='check'><h3><br></h3><br></button>"
                +"<button class='song-button' type='button' data-role='button' disabled=''>"
                +"<h3>"+ songList[index].title +"</h3>"
                + songList[index].artist
                + "</button>"
                +"<button class='vote-button' type='button' data-role='button' data-icon='delete'><h3><br></h3><br></button>"
                +"</div>");        
    }

    $("#"+newDivId).append("</div>");
    $("#"+newDivId).show();
}


function change_page(toPage){
    location.hash = "#" + toPage;
}
