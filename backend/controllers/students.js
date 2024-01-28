const Student = require('../models/Student');
const { StatusCodes } = require('http-status-codes');
const {BadRequestError,UnauthenticatedError} = require('../errors');




const getAllStudents = async (req, res) => {
    const students = await Student.find({});
    res.status(StatusCodes.OK).json({students, nbHits: students.length});
}    

const updateStudent = async (req, res) => { 
    const id = req.params.id;
    const student = await Student.findOneAndUpdate({ id }, req.body, { new: true, runValidators: true });
    if (!student) { 
        return res.status(StatusCodes.NOT_FOUND).json({ msg: `No student with id : ${id}` });
    }
    res.status(StatusCodes.OK).json(student);
}


const getAllCourses = async (req, res) => { 
    const { id } = req.params;
    const student = await Student.findOne({ id });
    if (!student) { 
        return res.status(StatusCodes.NOT_FOUND).json({ msg: `No student with id : ${id}` });
    }    
    res.status(StatusCodes.OK).json(student.courses);
}    

const addCourse = async (req, res) => { 
    const { id } = req.params;
    const course = req.body;
    
    const student = await Student.findOne({ id });
    if (!student) { 
        return res.status(StatusCodes.NOT_FOUND).json({ msg: `No student with id : ${id}` });
    }    
    const duplicate = student.courses.find((c) => c.id === course.id);
    if (!duplicate) {
        student.courses.push(course);
        await student.save();
    }    
    res.status(StatusCodes.OK).json(student.courses);
}    

const deleteCourse = async (req, res) => {
    const { studentId, courseId } = req.params;
    const student = await Student.findOne({ id:studentId});
    if (!student) { 
        return res.status(StatusCodes.NOT_FOUND).json({ msg: `No student with id : ${studentId}` });
    }    

    const course = student.courses.find((course) => course.id === Number(courseId));
    
    // console.log(course);
    if (!course) {
        return res.status(StatusCodes.NOT_FOUND).json({ msg: `No course with id : ${courseId}` });
    }    

    const courses = student.courses.filter((course) => course.id !== Number(courseId));
    student.courses = courses;
    await student.save();
    res.status(StatusCodes.OK).json({ courses, msg: `Course with id ${courseId} deleted` });
}    


const getProgress = async (req, res) => {
    const { id, courseId } = req.params;
    const student = await Student.findOne({ id });
    if (!student) { 
        throw new BadRequestError('No student with this id');
    }
    const course = student.courses.find((course) => course.id === Number(courseId));
    if (!course) {
        throw new BadRequestError('No course with this id');
    }
    const progress = course.progress.length/3*100;
    res.status(StatusCodes.OK).json({progress});

}
const getCertificate = async (req, res) => { 
    const student = await Student.findOne({ id: req.user.id });
    if (!student) { 
        throw new BadRequestError('No student with this id');
    }
    res.status(StatusCodes.OK).json(student.certificate);
}

const rate = async (req, res) => { 
    
}


module.exports = {
    getAllStudents,
    updateStudent,
    getAllCourses,
    addCourse,
    deleteCourse,
    getProgress,
    getCertificate,
    rate
};