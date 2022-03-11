
//import modules

require('dotenv').config()
const path = require('path')
const express = require('express')
const http = require('http')
const { Server } = require('socket.io')
const cors = require('cors')
const dbConnect = require('./config/dbConnect')

const authRoutes = require('./routes/authRoutes')
const roomRoutes = require('./routes/roomRoutes')
const messageRoutes = require('./routes/messageRoutes')
const { authVerifyOnSocket } = require('./middlewares/authMiddleware')
const messageModel = require('./models/messageModel')
const jwt = require('jsonwebtoken')


//initialization
const app = express()
dbConnect()
const server = http.createServer(app)
const PORT = process.env.PORT || 5000


//socket conn on production


//in development
  const io = new Server(server, {
    cors: {
      origin: process.env.CORS_ALLOWED,
      methods: ["GET", "POST"]
    }
  })

  //in production
  // const io = new Server(server)





//set global middlewares
app.use(express.json())

if(process.env.NODE_ENV === 'development'){

  app.use(cors({
      origin: 'http://localhost:3000'
  }))
}



//set routes
app.use('/api/auth', authRoutes)
app.use('/api/room', roomRoutes)
app.use('/api/messages', messageRoutes)

//react on production
if(process.env.NODE_ENV === 'production'){

  app.use(express.static(path.join(__dirname, '../your-chat-client', 'build')))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../your-chat-client', 'build', 'index.html'))
  })

}



//write socket logics
io.on('connection', (socket) => {
    console.log('connected with the id of: ', socket.id);

    socket.on('sendMessage', async (payload, room, cb) => {
      // console.log(payload)

      try {

        const { id } = await authVerifyOnSocket(payload.token)

       

        let message = await messageModel.create({
          message: payload.message,
          room: room,
          user: id,
        })

        message = await message.populate('user') 

        // console.log(message)


        socket.to(room).emit('receive', message)
        cb(message._id)
      } catch (error) {
        console.log(error.message)
      }
    })

    socket.on('join-room', (room) => {
      socket.join(room)
      // console.log('joined')
    })

    
    socket.on('leave-room', (room) => {
      socket.leave(room)
      // console.log('left')
    })

//     socket.on("disconnect", () => {
//   console.log(socket.id); // undefined
//   console.log('disconnected')
// });

  });


//listen to server
server.listen(PORT, () => console.log(`Server running on port ${PORT}`))