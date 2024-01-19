const mongoose = require('mongoose');
const QuestionSchema = require('./Question')

const AssessmentSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: [true, 'Please provide id'],
    },
    questions: [QuestionSchema],
})

module.exports = mongoose.model('Assessment', AssessmentSchema)