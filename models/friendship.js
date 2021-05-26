const mongoose = require('mongoose');

const friendshipSchema = new mongoose.Schema({
    //the user who sent this request
    from_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    // the user who accepted this request, the naming is just to understand, utherwise the user wont see the diffence
    to_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
},{
    timestamps: true

});

const Friendship = mongoose.model('Friendship', friendshipSchema);
module.exports = Friendship;