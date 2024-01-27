const express = require('express');
const router = express.Router();

const { getFinal, getScore } = require('../controllers/finals');
router.route('/:courseId').get(getFinal).post(getScore);

module.exports = router;