const mongoose = require('mongoose')


const Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    about: {
        type: String,
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


const roomModel = mongoose.model('rooms', Schema)

module.exports = roomModel