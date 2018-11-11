var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var VerifyToken = require(__root + 'auth/VerifyToken');

router.use(bodyParser.urlencoded({ extended: true }));
var Beer = require('./Beer');

// CREATES A NEW BEER
router.post('/', function (req, res) {
    Beer.create({
            name : req.body.name,
            style : req.body.style,
            brewedBy : req.body.brewedBy,
            imageURL : req.body.imageURL,
            abv : req.body.abv,
            ibu : req.body.ibu,
            cal : req.body.cal,
            rating : req.body.rating,
            abountThisBeer : req.body.abountThisBeer
        }, 
        function (err, beer) {
            if (err) return res.status(500).send("There was a problem adding the information to the database.");
            res.status(200).send(beer);
        });
});

// RETURNS ALL THE BEERS IN THE DATABASE
router.get('/', function (req, res) {
    Beer.find({}, function (err, beers) {
        if (err) return res.status(500).send("There was a problem finding the beers.");
        res.status(200).send(beers);
    });
});

// GETS A SINGLE BEERS FROM THE DATABASE
router.get('/:id', function (req, res) {
    Beer.findById(req.params.id, function (err, beer) {
        if (err) return res.status(500).send("There was a problem finding the beer.");
        if (!beer) return res.status(404).send("No beer found.");
        res.status(200).send(beer);
    });
});

// DELETES A BEERS FROM THE DATABASE
router.delete('/:id', function (req, res) {
    Beer.findByIdAndRemove(req.params.id, function (err, beer) {
        if (err) return res.status(500).send("There was a problem deleting the beer.");
        res.status(200).send("Beer: "+ beer.name +" was deleted.");
    });
});

// UPDATES A SINGLE BEERS IN THE DATABASE
// Added VerifyToken middleware to make sure only an authenticated user can put to this route
router.put('/:id', /* VerifyToken, */ function (req, res) {
    Beer.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, beer) {
        if (err) return res.status(500).send("There was a problem updating the beer.");
        res.status(200).send(beer);
    });
});


module.exports = router;