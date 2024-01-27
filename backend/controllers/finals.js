const Final = require('../models/Final');
const { StatusCodes } = require('http-status-codes');

const getFinal = async (req, res) => {
    const { courseId } = req.params;
    const final = await Final.findOne({ id: Number(courseId) });
    if (!final) {
        return res.status(StatusCodes.NOT_FOUND).json({ msg: 'Final not found' });
    }
    res.status(StatusCodes.OK).json( final.questions);
 }

const getScore = async (req, res) => { 
    const { courseId } = req.params;
    const final = await Final.findOne({ id: Number(courseId) });
    if (!final) {
        return res.status(StatusCodes.NOT_FOUND).json({ msg: 'Final not found' });
    }
    const { answer } = req.body;
    const correctAnswer = final.answer
    let score = 0
    for (let i = 0; i < answer.length; i++) {
        if (answer[i] === correctAnswer[i]) {
            score += 1
        }
    }
    res.status(StatusCodes.OK).json({score });
}

module.exports = {
    getFinal,
    getScore,
}