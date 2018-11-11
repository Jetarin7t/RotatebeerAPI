var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var VerifyToken = require(__root + 'auth/VerifyToken');

router.use(bodyParser.urlencoded({ extended: true }));
var Checkin = require('./Checkin');

// CREATES A NEW Checkin
router.post('/', VerifyToken, function (req, res) {
    Checkin.create({
            beerid : req.body.beerid,
            barid : req.body.barid,
            userid : req.body.userid,
            username : req.body.username,
            rating : req.body.rating,
            comment : req.body.comment,
            timestamp : req.body.timestamp
        }, 
        function (err, checkin) {
            if (err) return res.status(500).send("There was a problem adding the information to the database.");
            res.status(200).send(checkin);
        });
});

// RETURNS ALL THE CheckinS IN THE DATABASE
router.get('/', function (req, res) {
    Checkin.find({}, function (err, checkins) {
        if (err) return res.status(500).send("There was a problem finding the Checkins.");
        res.status(200).send(checkins);
    });
});

// GETS A SINGLE CheckinS FROM THE DATABASE
router.get('/:id', function (req, res) {
    Checkin.findById(req.params.id, function (err, checkin) {
        if (err) return res.status(500).send("There was a problem finding the Checkin.");
        if (!checkin) return res.status(404).send("No Checkin found.");
        res.status(200).send(checkin);
    });
});

// DELETES A CheckinS FROM THE DATABASE
router.delete('/:id', VerifyToken, function (req, res) {
    Checkin.findByIdAndRemove(req.params.id, function (err, checkin) {
        if (err) return res.status(500).send("There was a problem deleting the Checkin.");
        res.status(200).send("Checkin was deleted.");
    });
});

// UPDATES A SINGLE CheckinS IN THE DATABASE
// Added VerifyToken middleware to make sure only an authenticated user can put to this route
router.put('/:id', VerifyToken, function (req, res) {
    Checkin.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, checkin) {
        if (err) return res.status(500).send("There was a problem updating the Checkin.");
        res.status(200).send(checkin);
    });
});


module.exports = router;