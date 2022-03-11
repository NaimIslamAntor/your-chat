const mongoose = require('mongoose')

const dbConnect = async () => {
   try {

    const db = await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })

    console.log(`db connected: ${db.connection.host}`)
       
   } catch (error) {
       console.log(error.message)
   }

}

module.exports = dbConnect