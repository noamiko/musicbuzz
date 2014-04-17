var uristring = process.env.CUSTOMCONNSTR_MONGOLAB_URI;

// Require models
var HostList = require('./routes/hostlist');
var UserList = require('./routes/userlist');
var SongVoteList = require('./routes/song_vote_list');
var songlist = require('./routes/songlist');

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

app.use('/public', express.static(__dirname + '/public'));
app.get('/', express.static(__dirname + '/public'));
app.post('/signup_user', userList.prototype.signup_user.bind(userList));
app.post('/login_user', userList.prototype.login_user.bind(userList));
app.post('/get_user', userList.prototype.getUser().bind(userList));
app.post('/addhost', hostList.addHost.bind(hostList));
app.post('/addsongvote', songVoteList.addSongVote.bind(songVoteList));
app.post('/addsong', songList.addSong.bind(songList));

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
