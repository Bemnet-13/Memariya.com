const Course = require('../models/Course');

const getAllCourses = async (req, res) => { 
    const courses = await Course.find({})
    res.status(200).json(courses);
}
const getCourse = async (req, res) => { 
    
    const id = Number(req.params.id);
    const course = await Course.findOne({id});
    res.status(200).json({ course });
}

module.exports = {
    getAllCourses,
    getCourse
    
    }