const express = require('express')

// controller functions
const {loginUser, signupUser, resetPasswordEmail, resetPassword} = require('../controllers/userController')


const router = express.Router()

// login route
router.post('/login',loginUser)

// sign up route
router.post('/signup',signupUser)

// forgot password route
router.post('/forgot-password', resetPasswordEmail)

// reset password route
router.post('/reset-password',resetPassword)

module.exports = router