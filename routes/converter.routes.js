const express = require('express');
const multer = require('multer');
const router = express.Router();
const validateFile = require('../middlewares/validate');
const convertDocs = require('../controller/converter.controller');

// Set up multer for file uploads 
const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('file'), validateFile, convertDocs);

module.exports = router;