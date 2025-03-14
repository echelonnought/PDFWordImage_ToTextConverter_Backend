const express = require('express');
const multer = require('multer');
const router = express.Router();
const validateFile = require('../middlewares/validate');
const convertDocs = require('../controller/converter.controller');

// Set up multer for file uploads 
const upload = multer({
    limits: { fileSize: 100 * 1024 * 1024 }, // 100MB limit
  });

router.post('/.netlify/functions/upload', upload.single('file'), validateFile, convertDocs);

module.exports = router;