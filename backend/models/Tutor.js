const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config()


const CourseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name must be provided'],
    },
    id: {
        type:Number,
        required: [true, 'Please provide Course'] 
    },
    level: {
        type: String,
        enum: ['Advanced', 'Expert']
    },
})

const TutorSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: [true, 'Please provide id'],
    },
    name: {
        type: String,
        required: [true, 'name must be provided'],
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: [true, 'please provied email'],
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'please provide a valid email'],
        unique: true
    },

    password: {
        type: String,
        required: [true, 'please provied password'],
        minlength: 6,
    },
    bio: {
        type: String,
        required: [true, 'name must be provided'],
        minlength: 3,
        maxlength: 50
    },
    rating: {
        type: Number,
        default: 0
    },
    courses: {
        type: [CourseSchema],
        required:false
    }

})

TutorSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    // next()
})

TutorSchema.methods.createJWT = function () {
    return jwt.sign({TutorId: this._id, name: this.name}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_LIFETIME})
}

TutorSchema.methods.comparePassword = async function (canditatePassword) {
    const isMatch = await bcrypt.compare(canditatePassword, this.password)
    return isMatch
}



module.exports = mongoose.model('Tutor', TutorSchema)