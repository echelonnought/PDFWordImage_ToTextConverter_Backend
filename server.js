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
  origin: 'http://localhost:5173', // Allow requests from Vite frontend
}));
 
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});
 
app.use(errorConverter); 
app.use(errorHandler);
 
module.exports = app;
