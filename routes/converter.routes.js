const express = require('express');
const router = express.Router();
const validateFile = require('../middlewares/validate');
const convertDocs = require('../controller/converter.controller');
const uploadedMiddleware = require('../utils/upload');
const rateLimit = require('../utils/rateLimitter')


router.post('/.netlify/functions/api/upload', rateLimit, uploadedMiddleware, validateFile, convertDocs);

module.exports = router; 