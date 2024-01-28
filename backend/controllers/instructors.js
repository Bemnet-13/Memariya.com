const Instructor = require('../models/Instructor')
const { StatusCodes } = require('http-status-codes')


const getAllInstructors = async (req, res) => {
    const {course, level} = req.query
    const instructors = await Instructor.find({})
    let filtered = instructors
    if (course) {
        filtered = filtered.filter(instructor => {
            const courses = instructor.courses
            const badge = courses.find(badge => {
                return badge.name === course
            })
            if (badge && badge.name) {
                return badge.name === course
            }
            return false
        })
    }
    if (level) {
        filtered = filtered.filter(instructor => {
            const courses = instructor.courses
            const badge = courses.find(badge => {
                return badge.level === level
            })
            if (badge && badge.level) {
                return badge.level === level
            }
            return false
        })
    }
    // filtered = filtered ? filtered : instructors;
    filtered = filtered.map(instructor => {

        const { name, bio, email, rating } = instructor
        const len = Object.keys(rating.users).length || 1
        const rate = rating.count/len
        return {name, bio, email,rate}
    })
    filtered.sort((instructorA, instructorB) => instructorB.rate - instructorA.rate);
    
    res.status(StatusCodes.OK).json({ instructors:filtered, nbHits: filtered.length })
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