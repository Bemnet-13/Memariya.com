const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, 'Please provide question'],
    },
    choice: {
        type: [String],
        required: [true, 'Please provide description'],
        maxlength: 4
    },
    answer: {
        type: Number,
        enum:[0,1,2,3],
        required: true,
    },
});

module.exports = QuestionSchema;
