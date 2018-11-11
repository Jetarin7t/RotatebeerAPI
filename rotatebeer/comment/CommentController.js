var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var VerifyToken = require(__root + 'auth/VerifyToken');

router.use(bodyParser.urlencoded({ extended: true }));
var Comment = require('./Comment');

// CREATES A NEW Comment
router.post('/', VerifyToken, function (req, res) {
    Comment.create({
            checkinid : req.body.checkinid,
            userid : req.body.userid,
            username : req.body.username,
            comment : req.body.comment,
            timestamp : req.body.timestamp
        }, 
        function (err, comment) {
            if (err) return res.status(500).send("There was a problem adding the information to the database.");
            res.status(200).send(comment);
        });
});

// RETURNS ALL THE CommentS IN THE DATABASE
router.get('/', function (req, res) {
    Comment.find({}, function (err, comments) {
        if (err) return res.status(500).send("There was a problem finding the Comments.");
        res.status(200).send(comments);
    });
});

// GETS A SINGLE CommentS FROM THE DATABASE
router.get('/:id', function (req, res) {
    Comment.findById(req.params.id, function (err, comment) {
        if (err) return res.status(500).send("There was a problem finding the Comment.");
        if (!comment) return res.status(404).send("No Comment found.");
        res.status(200).send(comment);
    });
});

// DELETES A CommentS FROM THE DATABASE
router.delete('/:id', VerifyToken, function (req, res) {
    Comment.findByIdAndRemove(req.params.id, function (err, comment) {
        if (err) return res.status(500).send("There was a problem deleting the Comment.");
        res.status(200).send("Comment was deleted.");
    });
});

// UPDATES A SINGLE CommentS IN THE DATABASE
// Added VerifyToken middleware to make sure only an authenticated user can put to this route
router.put('/:id', VerifyToken, function (req, res) {
    Comment.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, comment) {
        if (err) return res.status(500).send("There was a problem updating the Comment.");
        res.status(200).send(comment);
    });
});


module.exports = router;