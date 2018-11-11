var mongoose = require('mongoose');  
var BeerSchema = new mongoose.Schema({  
    name : {
        type : String,
        required : true,
        max: 100
    },
    style : {
        type : String,
        required : true
    },
    brewedBy : {
        type : String,
        required : true
    },
    imageURL : {
        type : String
    },
    abv : {
        type : String,
        required : true
    },
    ibu : {
        type : Number,
        min : 0
    },
    cal : {
        type : Number,
        min : 0
    },
    rating : {
        type : Number
    },
    abountThisBeer : {
        type : String,
        required : true
    }
});
mongoose.model('Beer', BeerSchema);

module.exports = mongoose.model('Beer');