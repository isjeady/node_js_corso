const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title : {
        type: String,
        required : true,
    },      
    description : {
        type: String,
        required : false,
    },
    image : {
        type: String,
        required : false,
    },
    userId : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    },
    like : {
        type : Number,
        required : false,
        default : 0
    }      
});

module.exports = mongoose.model('Post',postSchema);
