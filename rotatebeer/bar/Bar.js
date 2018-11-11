var mongoose = require('mongoose');  
var BarSchema = new mongoose.Schema({  
    name : {
        type : String,
        required : true,
        max: 100
    },
    imageURL : {
        type : String
    },
    address : {
        type : String,
        required : true
    },
    lat : {
        type : String,
        required : true
    },
    long : {
        type : String,
        required : true
    },
    phone : {
        type : String,
        required : true
    },
    detail : {
        type : String
    }
});
mongoose.model('Bar', BarSchema);

module.exports = mongoose.model('Bar');