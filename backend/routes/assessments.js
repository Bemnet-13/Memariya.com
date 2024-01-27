const express = require('express');
const router = express.Router();

const { getAssessment, getScore } = require('../controllers/assessments');

router.route('/:courseId').get(getAssessment).post(getScore);

module.exports = router;