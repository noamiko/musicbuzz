function verify_password(name,password){
    return true;
}

function get_currentSong(adminId){
    display_song(song1,"current-song");
}

function get_next_to_play_list(){
    display_host_song_list(hostSongList,"host-song-list")
}

//function get_history(userId){
function get_history(){
    display_list(songList,"songs");
}

function sign_in_server(username,email,password,gender,date){
    var geolocation = getGeoLocation();
    var userId = new object();
    var host = null;
    var user = new user(userId,username,email,password,geolocation,host,gender,date);
    return true;
}

function vote_song(adminUserId,song){
    return true;
}

//song constructors
function song(songId,title,artist,length,file){
    this.songId = songId;
    this.title = title;
    this.artist = artist;
    this.length = length;
    this.file = file;
}

function hostSong(songId,title,artist,voteGood,voteBad,length){
    this.songId = songId;
    this.title = title;
    this.artist = artist;
    this.length = length;
    this.voteBood = voteGood;
    this.voteBad = voteBad
}

function user(userId,name,email,password,geolocation,host,songListId){
    this.userId =  userId;
    this.name = name;
    this.email = email;
    this.password = password;
    this.geolocation = geolocation;
    this.host = host;
    this.gender = gender;
    this.date = date;
    
    songListId: songListId;
}

var hostSong1 = new hostSong(1231231, "hostSong1", "artist1", 3.44, 10,5);
var hostSong2 = new hostSong(1231231, "hostSong2", "artist1", 3.44, 10,5);
var hostSong3 = new hostSong(1231231, "hostSong3", "artist1", 3.44, 10,5);
var hostSong4 = new hostSong(1231231, "hostSong4", "artist1", 3.44, 10,5);
var hostSongList = [hostSong1,hostSong2,hostSong3,hostSong4];

var song1 = new song( 1231231, "song1", "artist1", 3.44, null);
var song2 = new song( 1231231, "song2", "artist2", 3.44, null);
var song3 = new song( 1231231, "song3", "artist3", 3.44, null);
var song4 = new song( 1231231, "song4", "artist4", 3.44, null);
var song5 = new song( 1231231, "song5", "artist5", 3.44, null);
var song6 = new song( 1231231, "song6", "artist6", 3.44, null);
var songList = [song1,song2,song3,song4,song5,song6];


