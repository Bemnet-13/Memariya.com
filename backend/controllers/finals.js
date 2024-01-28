const Final = require('../models/Final');
const Student = require('../models/Student');
const Course = require('../models/Course');
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
    if (score === 9) {
        const student = await Student.findOne({ id: req.user.id });
        if (student) {
            const badge = student.certificate.find(badge => badge.id === Number(courseId))
            if (!badge) {
                const course = await Course.findOne({ id: Number(courseId) })
                student.certificate.push({ id: Number(courseId), name: course.name, level: course.level })
                await student.save();
            }
        }
    }
    res.status(StatusCodes.OK).json({score });
}

module.exports = {
    getFinal,
    getScore,
}