const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    user: {
        type : mongoose.Schema.ObjectId
    },
    //this defines the objectId of the liked object
    likeable: {
        type : mongoose.Schema.ObjectId,
        require: true,
        refPath : 'onModel'   //dynamic part of the reference
    },
    //this field is used for defining the type of the liked object since this is dyamic refernce
    onModel: {
        type: String,
        require: true,
        enum : ['post', 'Comment']  //to ensure only these 2 models contains likes in my db
    }
},{
    timestamps: true

});

const Like = mongoose.model('Like', likeSchema);
module.exports = Like;