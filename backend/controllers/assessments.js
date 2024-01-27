const Assessment = require('../models/Assessment');
const { StatusCodes } = require('http-status-codes');

const getAssessment = async (req, res) => {
    const { courseId } = req.params;
    const assessment = await Assessment.findOne({ id: Number(courseId) });
    if (!assessment) {
        return res.status(StatusCodes.NOT_FOUND).json({ msg: 'Assessment not found' });
    }
    res.status(StatusCodes.OK).json( assessment.questions);
}

const getScore = async (req, res) => { 
    const { courseId } = req.params;
    const assessment = await Assessment.findOne({ id: Number(courseId) });
    if (!assessment) {
        return res.status(StatusCodes.NOT_FOUND).json({ msg: 'Assessment not found' });
    }
    const { answer } = req.body;
    const correctAnswer = assessment.answer
    let score = 0
    for (let i = 0; i < answer.length; i++) {
        if (answer[i] === correctAnswer[i]) {
            score += 1
        }
    }
    res.status(StatusCodes.OK).json({score });
}

module.exports = {
    getAssessment,
    getScore,
}