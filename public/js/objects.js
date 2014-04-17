function host(id, bizName, userName, email, password, address, country, url, currentSongId, nextSongId, geoLocation) {
    this.id = id;
    this.bizName = bizName;
    this.userName = userName;
    this.email = email;
    this.password = password;
    this.address = address;
    this.country = country;
    this.url = url;
    this.currentSongId = currentSongId;
    this.nextSongId = nextSongId;
    this.geoLocation = geoLocation;
}

function user(id, firstName, lastName, userName, email, password, geolocation, host, gender, birthDate, country) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.userName = userName;
    this.email = email;
    this.password = password;
    this.geolocation = geolocation;
    this.gender = gender;
    this.birthDate = birthDate;
    this.country = country;
}

function song(id, title, artist, length, fileid) {
    this.id = id;
    this.title = title;
    this.artist = artist;
    this.length = length;
    this.fileid = fileid;
}

function songFile(id, songfile) {
    this.id = id;
    this.songFile = songfile;
}

function songHistory(userId, songId, like, voteGood, lastVotedDate) {
    this.userId = userId;
    this.songId = songId;
    this.like = like;
    this.voteGood = voteGood;
    this.lastVotedDate = lastVotedDate;
}

function songVote(hostId, songId, like, dislike, lastVotedDate, nextAvailibleVoteDate) {
    this.hostId = hostId;
    this.songId = songId;
    this.like = like;
    this.dislike = dislike;
    this.lastVotedDate = lastVotedDate;
    this.nextAvailibleVoteDate = nextAvailibleVoteDate;
}

function geolocation(lat, lng) {
    this.lat = lat;
    this.lon = lng;
}