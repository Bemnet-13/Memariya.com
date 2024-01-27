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
});

module.exports = QuestionSchema;
