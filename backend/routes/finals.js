const express = require('express');
const router = express.Router();
const finalAuthentication = require('../middleware/finalAuthentication');

const { getFinal, getScore } = require('../controllers/finals');
router.route('/:courseId').get(finalAuthentication,getFinal).post(getScore);

module.exports = router;