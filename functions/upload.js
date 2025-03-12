const express = require('express');
const serverless = require('serverless-http');
const multer = require('multer');
const validateFile = require('../middlewares/validate');
const convertDocs = require('../controller/converter.controller');
const { errorHandler, errorConverter } = require('../middlewares/error');
const cors = require('cors');

const app = express();

// Multer setup
const upload = multer({
  dest: '/tmp/uploads/',
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB
});

// Middleware
app.use(express.json());
app.use(cors({
  origin: ['https://pdf-word-image-to-text-converter-frontend.vercel.app', 'http://localhost:5173'],
  methods: ['POST'],
  allowedHeaders: ['Content-Type'],
}));

// Route
app.post('/upload', upload.single('file'), validateFile, convertDocs);

// Error handling
app.use(errorConverter);
app.use(errorHandler);

// Export as serverless function
module.exports.handler = serverless(app);