const express = require('express');
const router = express.Router();

const { getAllStudents,getAllCourses, addCourse,deleteCourse,updateStudent,getProgress,getCertificate,rate,rateInstructor } = require('../controllers/students');

const rateAuthentication = require('../middleware/rateAuthentication')

router.route('/').get(getAllStudents);
router.route('/:id/').patch(updateStudent)
router.route('/:id/rateInstructor').post(rateInstructor);
router.route('/:id/rate').post(rateAuthentication,rate);
router.route('/:id/courses').get(getAllCourses).post(addCourse);
router.route('/:id/progress/:courseId').get(getProgress)
router.route('/:id/certificates').get(getCertificate);
router.route('/:studentId/courses/:courseId').delete(deleteCourse);




module.exports = router;