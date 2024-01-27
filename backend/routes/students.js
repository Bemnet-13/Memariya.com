const express = require('express');
const router = express.Router();

const { getAllStudents,getAllCourses, addCourse,deleteCourse,updateStudent } = require('../controllers/students');


router.route('/').get(getAllStudents);
router.route('/:id/').patch(updateStudent);
router.route('/:id/courses').get(getAllCourses).post(addCourse);
router.route('/:studentId/courses/:courseId').delete(deleteCourse);




module.exports = router;