const jwt = require('jsonwebtoken')
const userModel = require('../models/userModel')

//validation on registration
const registerValidation = async (req, res, next) => {
    const { username, password, confirmPassword } = req.body

    const errors = []

    if (!username) {
        errors.push('Username is required')
    }

    if (!password) {
        errors.push('Password is required')
    }

    if (password?.length < 6) {
        errors.push('Password must be atleast 6 characters')
    }

    
    if (confirmPassword != password) {
        errors.push('Password and confirm password not matched')
    }

    const getTheUser = await userModel.findOne({username})

    if(getTheUser){
        errors.push('Username already exists try something different')
    }

    if (errors.length) {
        return res.status(422).json(errors)
    }

    next()
}


//protect routes
const protect = (req, res, next) => {
    const auth = req.headers.authorization

    // console.log(auth)
    if (!auth) {
        return res.status(401).json({message: 'You are unauthenticated!'})
    }

    if(!auth.startsWith('Bearer')){
        return res.status(401).json({message: 'You are unauthenticated!'})
    }

    const token = auth.split(' ')[1]

    jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
        if (error) {
            return res.status(401).json({message: 'You token is not valid!'})
        }

        req.user = user

        next()
    })
}


//auth verify for socket

const authVerifyOnSocket = async (token) => {
    return jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
        if (error) {
           throw new Error('Token is not valid')
        }

        return user
    })


}



module.exports = { registerValidation, protect, authVerifyOnSocket, }