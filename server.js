var express = require('express');


var app = express();//.createServer();
app.configure(function () {
    app.use(express.logger('dev'));    
    app.use(express.bodyParser());//it will parse json request bodies (as well as others), and place the result in req.body:
});

app.use('/public', express.static(__dirname + '/public'));
app.get('/', express.static(__dirname + '/public'));

app.listen(3000);
