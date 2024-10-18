const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')

// get all worksouts
const getWorkouts = async (req, res) => {
    const user_id = req.user._id
    const original_workouts = await Workout.find({ user_id }).sort({createdAt: -1})
    const workouts = original_workouts.map(workout => ({
        _id: workout._id,
        title: workout.title,
        reps: workout.reps,
        load: workout.load,
        updatedAt: workout.updatedAt
    }));
    res.status(200).json({workouts})
}
// get a single workout
const getWorkout = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout'})
    }
    
    const original_workout = await Workout.findById(id)
    if (!original_workout){
        return res.status(404).json({error: 'No such workout'})
    }
    const workout = {
        _id: original_workout._id,
        title: original_workout.title,
        reps: original_workout.reps,
        load: original_workout.load,
        updatedAt: original_workout.updatedAt
    }
    res.status(200).json({workout})
}
// create a new workout
const createWorkout = async (req, res) => {
    const {title, load, reps} = req.body

    let emptyFields = []
    
    if (!title){
        emptyFields.push('title')
    }
    if (!load){
        emptyFields.push('load')
    }
    if (!reps){
        emptyFields.push('reps')
    }
    if (load < 0){
        return res.status(400).json({error: 'Load cannot be negative', emptyFields: ['load']})
    }
    if (reps < 0){
        return res.status(400).json({error: 'Reps cannot be negative', emptyFields: ['reps']})
    }
    if (emptyFields.length > 0){
        return res.status(400).json({ error: 'Please fill in all the fields', emptyFields})
    }
    try{
        const user_id = req.user._id
        const original_workout = await Workout.create({title, load, reps, user_id})
        const workout = {
            _id: original_workout._id,
            title: original_workout.title,
            reps: original_workout.reps,
            load: original_workout.load,
            updatedAt: original_workout.updatedAt
        }
        res.status(200).json(workout)
    } catch(error){
        res.status(400).json({error: error.message})
    }
}

// delete a workout
const deleteWorkout = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout'})
    }
    
    const original_workout = await Workout.findOneAndDelete({_id: id})
    if (!original_workout){
        return res.status(400).json({error: 'No such workout'})
    }
    const workout = {
        _id: original_workout._id,
        title: original_workout.title,
        reps: original_workout.reps,
        load: original_workout.load,
        updatedAt: original_workout.updatedAt
    }
    res.status(200).json({workout})
}
// update a workout
const updateWorkout = async (req, res) => {
    const  {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout'})
    }

    const original_workout = await Workout.findOneAndUpdate({_id: id},{
        ...req.body
    })

    if (!original_workout){
        return res.status(400).json({error: 'No such workout'})
    }
    const workout = {
        _id: original_workout._id,
        title: original_workout.title,
        reps: original_workout.reps,
        load: original_workout.load,
        updatedAt: original_workout.updatedAt
    }
    res.status(200).json({workout})
}

module.exports = {
    createWorkout,
    getWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout
}