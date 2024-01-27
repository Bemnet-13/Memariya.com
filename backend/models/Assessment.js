const mongoose = require('mongoose');
const QuestionSchema = require('./Question')

const AssessmentSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: [true, 'Please provide id'],
    },
    questions: [QuestionSchema],
    answer: {
        type: [Number],
        enum:[0,1,2,3],
        required: true,
    },
})

module.exports = mongoose.model('Assessment', AssessmentSchema)