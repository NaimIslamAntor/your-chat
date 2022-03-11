const mongoose = require('mongoose')


const Schema = new mongoose.Schema({
    message: {
        type: String,
        required: true,
    },
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'rooms',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},
{
    timestamps: true
}
)


const messageModel = mongoose.model('messages', Schema)

module.exports = messageModel