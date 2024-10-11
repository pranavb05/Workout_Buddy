const express = require('express')
require('dotenv').config();
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')

// express app
const app = express()

app.use(express.json())
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
