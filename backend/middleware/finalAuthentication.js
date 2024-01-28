const {NotFoundError, BadRequestError } = require('../errors');
const Student = require('../models/Student');

const final = async (req, res, next) => {
    const { courseId } = req.params;
    const student = await Student.findOne({ id: req.user.id });
    if (!student) {
        throw new NotFoundError('Student not found' );
    }
    const course = student.courses.find(course => course.id === Number(courseId))
    if (!course) {
        throw new NotFoundError('Course not found' );
    }
    const progress = course.progress
    if (progress.length < 3) {
        throw new BadRequestError('You have not completed all milestones')
    }
    next();
}
module.exports = final;