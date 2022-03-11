const roomModel = require('../models/roomModel')
const messageModel = require('../models/messageModel')
const {messageResource} = require('../resource/messageResource')



//paginateMessages
//desc - paginates rooms messages
//route - POST /api/messages/:id
//status - protected

const paginateMessages = async (req, res) => {
    const { id } = req.params


    try {

        const messages = await messageModel.find({room: id}).populate('user')

        res.json(messageResource(messages))

    } catch (error) {
        res.status(404)
        res.json({message: 'Sorry room not found!'})
    }
}

module.exports = { paginateMessages }
