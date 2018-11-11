var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var VerifyToken = require(__root + 'auth/VerifyToken');

router.use(bodyParser.urlencoded({ extended: true }));
var Event = require('./Event');

// CREATES A NEW Event
router.post('/', function (req, res) {
    Event.create({
            userid : req.body.userid,
            username : req.body.username,
            eventname : req.body.eventname,
            detail : req.body.detail,
            address : req.body.address,
            eventdate : req.body.eventdate,
            timestamp : req.body.timestamp
        }, 
        function (err, event) {
            if (err) return res.status(500).send("There was a problem adding the information to the database.");
            res.status(200).send(event);
        });
});

// RETURNS ALL THE EventS IN THE DATABASE
router.get('/', function (req, res) {
    Event.find({}, function (err, events) {
        if (err) return res.status(500).send("There was a problem finding the Events.");
        res.status(200).send(events);
    });
});

// GETS A SINGLE EventS FROM THE DATABASE
router.get('/:id', function (req, res) {
    Event.findById(req.params.id, function (err, event) {
        if (err) return res.status(500).send("There was a problem finding the Event.");
        if (!event) return res.status(404).send("No Event found.");
        res.status(200).send(event);
    });
});

// DELETES A EventS FROM THE DATABASE
router.delete('/:id', function (req, res) {
    Event.findByIdAndRemove(req.params.id, function (err, event) {
        if (err) return res.status(500).send("There was a problem deleting the Event.");
        res.status(200).send("Event: "+ event.eventname +" was deleted.");
    });
});

// UPDATES A SINGLE EventS IN THE DATABASE
// Added VerifyToken middleware to make sure only an authenticated user can put to this route
router.put('/:id', /* VerifyToken, */ function (req, res) {
    Event.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, event) {
        if (err) return res.status(500).send("There was a problem updating the Event.");
        res.status(200).send(event);
    });
});


module.exports = router;