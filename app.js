var uristring = process.env.CUSTOMCONNSTR_MONGOLAB_URI;

// Require models
var HostList = require('./routes/hostlist');
var UserList = require('./routes/userlist');
var SongVoteList = require('./routes/song_vote_list');
var songlist = require('./routes/songlist');
var song_history_list = require('./routes/song_history_list');

// Add require
var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());

var hostList = new HostList(uristring);
var userList = new UserList(uristring);
var songVoteList = new SongVoteList(uristring);
var songList = new songlist(uristring);
var songHistoryList = new song_history_list(uristring);

app.use('/public', express.static(__dirname + '/public'));
app.get('/', express.static(__dirname + '/public'));

// UserList posts
app.post('/signup_user', userList.signup_user.bind(userList));
//app.post('/login_to_host', userList.login_to_host.bind(userList));
app.post('/login_user', userList.login_user.bind(userList));
//app.post('/get_user', userList.get_user.bind(userList));
//app.post('/get_song_history', userList.get_song_history.bind(userList));

// HostList posts
app.post('/signup_host', hostList.signup_host.bind(hostList));
//app.post('/get_host', hostList.get_host.bind(hostList));
//app.post('/login_host', hostList.login_host.bind(hostList));
//app.post('/get_host_users', hostList.get_host_users.bind(hostList));

//Song history posts
//app.post('/add_song_history', songHistoryList.add_song_history.bind(songHistoryList));


//app.post('/addsongvote', songVoteList.addSongVote.bind(songVoteList));
//app.post('/addsong', songList.addSong.bind(songList));

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
app.listen(process.env.port || 3000);
