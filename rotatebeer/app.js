var express = require('express');
var app = express();
var db = require('./db');
global.__root   = __dirname + '/'; 

app.get('/api', function (req, res) {
  res.status(200).send('API works.');
});

var UserController = require(__root + 'user/UserController');
app.use('/api/users', UserController);

var AuthController = require(__root + 'auth/AuthController');
app.use('/api/auth', AuthController);

var BeerController = require(__root + 'beer/BeerController');
app.use('/api/beers', BeerController);

var BarController = require(__root + 'bar/BarController');
app.use('/api/bars', BarController);

var CheckinController = require(__root + 'checkin/CheckinController');
app.use('/api/checkins', CheckinController);

var CommentController = require(__root + 'comment/CommentController');
app.use('/api/comments', CommentController);

var EventController = require(__root + 'event/EventController');
app.use('/api/events', EventController);

module.exports = app;