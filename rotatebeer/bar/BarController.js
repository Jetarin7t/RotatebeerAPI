var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var VerifyToken = require(__root + 'auth/VerifyToken');

router.use(bodyParser.urlencoded({ extended: true }));
var Bar = require('./Bar');

// CREATES A NEW BAR
router.post('/', VerifyToken, function (req, res) {
    Bar.create({
            name : req.body.name,
            imageURL : req.body.imageURL,
            address : req.body.address,
            lat : req.body.lat,
            long : req.body.long,
            phone : req.body.phone,
            detail : req.body.detail
        }, 
        function (err, bar) {
            if (err) return res.status(500).send("There was a problem adding the information to the database.");
            res.status(200).send(bar);
        });
});

// RETURNS ALL THE BARS IN THE DATABASE
router.get('/', function (req, res) {
    Bar.find({}, function (err, bars) {
        if (err) return res.status(500).send("There was a problem finding the bars.");
        res.status(200).send(bars);
    });
});

// GETS A SINGLE BARS FROM THE DATABASE
router.get('/:id', function (req, res) {
    Bar.findById(req.params.id, function (err, bar) {
        if (err) return res.status(500).send("There was a problem finding the bar.");
        if (!bar) return res.status(404).send("No bar found.");
        res.status(200).send(bar);
    });
});

// DELETES A BARS FROM THE DATABASE
router.delete('/:id', VerifyToken, function (req, res) {
    Bar.findByIdAndRemove(req.params.id, function (err, bar) {
        if (err) return res.status(500).send("There was a problem deleting the bar.");
        res.status(200).send("Bar: "+ bar.name +" was deleted.");
    });
});

// UPDATES A SINGLE BARS IN THE DATABASE
// Added VerifyToken middleware to make sure only an authenticated user can put to this route
router.put('/:id', VerifyToken, function (req, res) {
    Bar.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, bar) {
        if (err) return res.status(500).send("There was a problem updating the bar.");
        res.status(200).send(bar);
    });
});


module.exports = router;