const express = require('express')
const router = express.Router()

const { allRooms,
       createRoom,
       getSpecRoom,
       deleteRoom,
       editRoom } = require('../controllers/roomController')

const { protect } = require('../middlewares/authMiddleware')


router.route('/')
.get(protect, allRooms)
.post(protect, createRoom)


router.route('/:id')
.get(protect, getSpecRoom)
.delete(protect, deleteRoom)
.put(protect, editRoom)


module.exports = router
