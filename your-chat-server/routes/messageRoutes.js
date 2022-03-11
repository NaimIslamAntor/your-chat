const express = require('express')
const router = express.Router()
const { protect } = require('../middlewares/authMiddleware')
const { paginateMessages } = require('../controllers/messageController')

router.get('/:id', protect, paginateMessages)


module.exports = router