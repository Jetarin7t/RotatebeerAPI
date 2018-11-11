var mongoose = require('mongoose');  
var CheckinSchema = new mongoose.Schema({  
    beerid : {
        type : String,
        required : true
    },
    barid : {
        type : String,
        required : true
    },
    userid : {
        type : String,
        required : true
    },
    username : {
        type : String,
        required : true
    },
    rating : {
        type : Number,
        min : 0,
        max : 5
    },
    comment : {
        type : String
    },
    timestamp : {
        type : String
    }
});
mongoose.model('Checkin', CheckinSchema);

module.exports = mongoose.model('Checkin');