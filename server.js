const express = require('express');
const app = express();
const fileRouter = require('./routes/converter.routes');
const { errorHandler, errorConverter } = require('./middlewares/error');
const ApiError = require('./utils/ApiError');
const httpStatus = require('http-status');
const cors = require('cors');
 
app.use(express.json());
app.use(express.static('public'));
app.use(fileRouter);

// Enable CORS for frontend origin
app.use(cors({
  origin: 'https://pdf-word-image-to-text-converter-frontend.vercel.app/', // Allow requests from Vite frontend
  methods: ['POST'], // Allow only POST requests
  allowedHeaders: ['Content-Type'], // Allow necessary headers
}));
 
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});
 
app.use(errorConverter); 
app.use(errorHandler);
 
module.exports = app;
