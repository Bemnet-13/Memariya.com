const express = require('express');
const router = express.Router();

const {getAllInstructors,updateInstructor ,getAllCourses,addCourse, deleteCourse } = require('../controllers/instructors');

router.route('/').get(getAllInstructors);
router.route('/:id/').patch(updateInstructor);
router.route('/:id/courses').get(getAllCourses).post(addCourse);
router.route('/:instructorId/courses/:courseId').delete(deleteCourse);


module.exports = router;