const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')
const cors = require('cors')

require('dotenv').config();

// express app
const app = express()

app.use(express.json())
app.use(cors({
    origin: process.env.FRONTEND_URL, 
    credentials: true
}))

// middleware
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
});

// routes
app.use('/api/workouts', workoutRoutes)
app.use('/api/user', userRoutes)

// connect to MongoDB
mongoose.connect(process.env.MONGO_URI,)
    .then(()=>{
        // list for requests
        app.listen(process.env.PORT, ()=>{
            console.log('Connected to DB and Server is running on port', process.env.PORT)
        })
    })
    .catch((error)=>{
        console.log(error)
    })
