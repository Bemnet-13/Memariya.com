const Instructor = require('../models/Instructor')
const { StatusCodes } = require('http-status-codes')


const getAllInstructors = async (req, res) => {
    const instructors = await Instructor.find({})
    res.status(StatusCodes.OK).json({ instructors, nbHits: instructors.length })
}

const updateInstructor = async (req, res) => { 
    const id = req.params.id;
    const instructor = await Instructor.findOneAndUpdate({ id }, req.body, { new: true, runValidators: true });
    if (!instructor) { 
        return res.status(StatusCodes.NOT_FOUND).json({ msg: `No instructor with id : ${id}` });
    }
    res.status(StatusCodes.OK).json(instructor);
}

const getAllCourses = async (req, res) => { 
    const { id } = req.params;
    const instructor = await Instructor.findOne({ id });
    if (!instructor) { 
        return res.status(StatusCodes.NOT_FOUND).json({ msg: `No instructor with id : ${id}` });
    }
    res.status(StatusCodes.OK).json(instructor.courses);
}
const addCourse = async (req, res) => { 
    const { id } = req.params;
    const course = req.body;
    
    const instructor = await Instructor.findOne({ id });
    if (!instructor) { 
        return res.status(StatusCodes.NOT_FOUND).json({ msg: `No instructor with id : ${id}` });
    }
    const duplicate = instructor.courses.find((c) => c.id === course.id);
    if (!duplicate) {
        instructor.courses.push(course);
        await instructor.save();
    }
    res.status(StatusCodes.OK).json(instructor.courses );
}

const deleteCourse = async (req, res) => { 
    const { instructorId, courseId} = req.params;
    
    const instructor = await Instructor.findOne({id: instructorId });
    if (!instructor) { 
        return res.status(StatusCodes.NOT_FOUND).json({ msg: `No instructor with id : ${instructorId}` });
    }
    const course = instructor.courses.find((course) => course.id === Number(courseId));
    console.log(instructor.courses);
    if (!course) {
        return res.status(StatusCodes.NOT_FOUND).json({ msg: `No course with id : ${courseId}` });
    }
    const courses = instructor.courses.filter((course) => course.id !== Number(courseId));
    instructor.courses = courses;
    await instructor.save();
    res.status(StatusCodes.OK).json({ courses, msg: `Course with id ${courseId} deleted` });

}
module.exports = {
    getAllInstructors,
    updateInstructor,
    getAllCourses,
    addCourse,
    deleteCourse,

}