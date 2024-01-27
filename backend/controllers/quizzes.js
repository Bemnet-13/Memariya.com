const Quiz = require('../models/Quiz');
const {StatusCodes} = require('http-status-codes');

const getQuiz = async (req, res) => {
    const { courseId, milestone } = req.query;
    const quiz = await Quiz.findOne({ id: Number(courseId), milestone });
    if (!quiz) {
        return res.status(404).json({ error: 'Quiz not found' });
    }
    const questions = quiz.questions
    res.status(StatusCodes.OK).json(questions);
}

const getScore = async (req, res) => {
    const { courseId, milestone } = req.query;
    const {answer} = req.body;
    const quiz = await Quiz.findOne({ id: Number(courseId), milestone });
    if (!quiz) {
        return res.status(404).json({ error: 'Quiz not found' });
    }
    const correctAnswer = quiz.answer
    let score = 0
    for (let i = 0; i < answer.length; i++) {
        if (answer[i] === correctAnswer[i]) {
            score += 1
        }
    }
    res.status(StatusCodes.OK).json({score});
}

module.exports = {
    getQuiz,
    getScore,
}