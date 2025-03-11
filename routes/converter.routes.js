const express = require('express');
const multer = require('multer');
const router = express.Router();
const validateFile = require('../middlewares/validate');
const convertDocs = require('../controller/converter.controller');

// Set up multer for file uploads 
const upload = multer({
    dest: '/tmp/uploads/', // Vercel uses /tmp for temporary storage
    limits: { fileSize: 100 * 1024 * 1024 }, // 100MB limit
  });

  router.post('/upload', upload.single('file'), async (req, res, next) => {
    try {
      await validateFile(req, res, next);
      await convertDocs(req, res);
    } catch (err) {
      next(err);
    }
  });

module.exports = router;