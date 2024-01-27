const Course = require('../models/Course');
const { StatusCodes } = require('http-status-codes');

const getAllCourses = async (req, res) => {
    const courses = await Course.find({})
    res.status(200).json(courses);
}
const getCourse = async (req, res) => {

    const id = Number(req.params.id);
    const course = await Course.findOne({ id });
    if (!course) {
        res.status(StatusCodes.NOT_FOUND).json({ msg: `No course with id : ${id}` });
    }
    res.status(StatusCodes.OK).json({ course });
}

module.exports = {
    getAllCourses,
    getCourse

}