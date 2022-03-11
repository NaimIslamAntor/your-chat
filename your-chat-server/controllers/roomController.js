const roomModel = require('../models/roomModel')
const { roomResource } = require('../resource/roomResource')

//allRooms
//desc - provide all rooms
//route - GET /api/room
//status - protected

const allRooms = async (req, res) => {
    try {
        const rooms = await roomModel.find().select(['-about', '-user', '-createdAt', '-updatedAt']).lean()
        res.json(rooms)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}


//createRoom
//desc - create a room
//route - POST /api/room
//status - protected

const createRoom = async (req, res) => {
    const { room, about } = req.body
    const { user } = req

    if(!room){
        return res.status(422).json({message: "Room name is required"})
    }

   try {

    const roomExistsOrNot = await roomModel.findOne({name: room})

    if (roomExistsOrNot) {
        return res.status(400).json({message: "Room name is taken try something else!"})
    }

    const createRoom = await roomModel.create({
        name: room,
        about: about ? about : '',
        user: user.id
    })


    res.status(201).json(createRoom)

   } catch (error) {
        res.status(500).json({message: error.message})

   }

}


//getSpecRoom
//desc - get a specific room by id
//route - POST /api/room/:id
//status - protected

const getSpecRoom = async (req, res) => {
    const { id } = req.params

    console.log(id)

    try {
        const room = await roomModel.findById(id).populate('user')
        res.json(roomResource(room, false))

    } catch (error) {
        res.status(404)
        res.json({message: "Room not found"})
    }
}



//deleteRoom
//desc - deletes a room by id
//route - DELETE /api/room/:id
//status - protected

const deleteRoom = async (req, res) => {
    const { id } = req.params
    const { user } = req

    try {
        const room = await roomModel.findById(id)

        if (!room.user.equals(user.id)) {
            return res.status(401).json({message: 'Authorization failed'})
        }

        await room.delete()
        res.status(204)
        res.end()
        
    } catch (error) {
        res.status(404)
        res.json({message: "Room not found"})
    }


}


//editRoom
//desc - edits a room by id
//route - PUT /api/room/:id
//status - protected

const editRoom = async (req, res) => {
    const { id } = req.params
    const { user } = req

    const { room:name, about } = req.body


    if(!name){
        return res.status(422).json({message: "Room name is required"})
    }

    try {
        const room = await roomModel.findById(id)

        if (!room.user.equals(user.id)) {
            return res.status(401).json({message: 'Authorization failed'})
        }

        room.name = name
        room.about = about ? about : ''
        await room.save()

        res.json(room)
        
    } catch (error) {
        res.status(404)
        res.json({message: "Room not found"})
    }


}


module.exports = { getSpecRoom, createRoom, allRooms, deleteRoom, editRoom }