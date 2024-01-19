const mongoose = require('mongoose');

const QuestionSchema = require('./Question')


const QuizSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: [true, 'Please provide id'],
    },
    milestone: {
        type: Number,
        enum: ['1', '2', '3'],
        required: [true, 'Please provide milestone'],
    },
    level: {
        type: String,
        enum: ['Beginner','Advanced', 'Intermediate']
    },
    questions: [QuestionSchema]
})

module.exports = mongoose.model('Quiz', QuizSchema)