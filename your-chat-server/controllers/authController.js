const jwt = require('jsonwebtoken')
const userModel = require('../models/userModel')
const bcrypt = require('bcrypt')

//desc - register a user
//route - POST /api/auth/register
//status - public
const register = async(req, res) => {
   const { username, password } = req.body

   try {

    const userCreate = await userModel.create({
        username, password
    })

    const user = {
        id: userCreate._id,
        username: userCreate.username,
        password: userCreate.password
    }

    const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '90d' })
    user.token = token

    delete user.password

    res.status(201).json(user)

   } catch (error) {
        console.log(error.message)
        res.status(500).json({message: 'Something went wrong in the server!'})
   }

}

//desc - login a user
//route - POST /api/auth/login
//status - public
const login = async(req, res) => {
    const { username, password } = req.body

    if(!username || !password){
        return res.status(422).json(['Please fill username and password'])
    }

    try {

    const user = await userModel.findOne({username})

    if (!user) {
        return res.status(404).json(['User doesnot exist'])
    }

    const compare = await bcrypt.compare(password, user.password)

    if(!compare){
        return res.status(401).json(['Password not matched'])
    }


    const userPayload = {
        id: user._id,
        username: user.username,
        password: user.password
    }

    const token = jwt.sign(userPayload, process.env.JWT_SECRET, { expiresIn: '90d' })
    userPayload.token = token

    delete userPayload.password

    res.json(userPayload)

        
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: 'Something went wrong in the server!'})
    }


}

module.exports = { register, login }