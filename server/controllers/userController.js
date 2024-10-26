const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3h'})
}

const createResetToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '10m'})
}

// login user 
const loginUser = async (req, res) => {
    const {email, password} = req.body
    try{
        const user = await User.login(email, password)
        const firstName = user.firstName
        const lastName = user.lastName
        //create a token
        const token = createToken(user._id)

        res.status(200).json({firstName, lastName, email, token})
    } catch(error){
        res.status(400).json({error: error.message})
    }
}

// sign up user
const signupUser = async (req, res) => {
    const {firstName, lastName, email,password} = req.body
    
    try{
        const user = await User.signup(firstName, lastName, email, password)
        //create a token
        const token = createResetToken(user._id)
        const decoded = jwt.verify(token, process.env.SECRET)
        res.status(200).json({firstName, lastName, email, token})
    } catch(error){
        res.status(400).json({error: error.message})
    }
}

// send the email to reset password
const resetPasswordEmail = async (req, res) => {
    const {email} = req.body
    try {
        let user = await User.checkEmail(email)
        const token = createToken(user._id)
        user = await User.setToken(user._id, token)
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
              user: process.env.GMAIL_EMAIL,
              pass: process.env.GMAIL_APP_PASSWORD,
            },
        });
        const mailOptions = {
            from: "no-reply@bhargavap.club",
            to: email,
            subject: "Reset your Workout Buddy Password!",
            text: `Please click the link below to reset your Workout Buddy Password: ${process.env.FRONTEND_URL}/reset-password/${token}`,
          };
        await transporter.sendMail(mailOptions)
        res.status(200).json({email})
    } catch(error){
        return res.status(400).json({ error: error.message })
    }
}

const resetPassword = async (req, res) =>{
    const {token, password} = req.body
    try {
        const user = await User.verifyResetToken(token)
        await User.updatePassword(user._id, password)
        res.status(200).json({message: 'Password reset successful'})
    } catch(error){
        return res.status(400).json({ error: error.message })
    }
}

module.exports = {
    loginUser,
    signupUser, 
    resetPasswordEmail, 
    resetPassword
}
