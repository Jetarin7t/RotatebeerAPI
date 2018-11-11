var mongoose = require('mongoose');  
var EventSchema = new mongoose.Schema({  
    userid : {
        type : String,
        required : true
    },
    username : {
        type : String,
        required : true
    },
    eventname : {
        type : String,
        required : true,
        max : 100
    },
    detail : {
        type : String
    },
    address : {
        type : String,
        required : true
    },
    eventdate : {
        type : String,
        required : true
    },
    timestamp : {
        type : String
    }
});
mongoose.model('Event', EventSchema);

module.exports = mongoose.model('Event');