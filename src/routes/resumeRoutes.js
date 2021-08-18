const express = require('express');
const router = express.Router();
const resumeController = require('../controllers/resumeController');

router.route('/')
    .get(resumeController.getResumePage);

router.post('/contact-me', resumeController.contactMe);

module.exports = router;