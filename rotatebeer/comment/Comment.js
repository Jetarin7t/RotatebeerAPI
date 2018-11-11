var mongoose = require('mongoose');  
var CommentSchema = new mongoose.Schema({  
    checkinid : {
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
    comment : {
        type : String,
        max : 250
    },
    timestamp : {
        type : String
    }
});
mongoose.model('Comment', CommentSchema);

module.exports = mongoose.model('Comment');