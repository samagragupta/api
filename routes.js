const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.get('/users', controller.getUsers)
router.post('/users', controller.createUser)
router.get('/interviews', controller.getInterviews)
router.post('/interview', controller.createInterview)
router.post('/interview/update', controller.reScheduleInterview)
module.exports = router;
