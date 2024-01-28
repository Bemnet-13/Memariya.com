const express = require('express');
const router = express.Router();

const { getAllStudents,getAllCourses, addCourse,deleteCourse,updateStudent,getProgress,getCertificate } = require('../controllers/students');


router.route('/').get(getAllStudents);
router.route('/:id/').patch(updateStudent);
router.route('/:id/courses').get(getAllCourses).post(addCourse);
router.route('/:id/progress/:courseId').get(getProgress)
router.route('/:id/certificates').get(getCertificate);
router.route('/:studentId/courses/:courseId').delete(deleteCourse);




module.exports = router;