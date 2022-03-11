const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const Schema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        min: 6
    }
},
{
    timestamps: true
}
)

Schema.pre('save', async function(){
    const sault = await bcrypt.genSalt(12)
    const hashPassword = await bcrypt.hash(this.password, sault)
    this.password = hashPassword
})

const userModel = mongoose.model('User', Schema)

module.exports = userModel