const fs = require('fs').promises;
const ApiError = require('../utils/ApiError');
const { validateFileSchema } = require('../validations/file.validation')

const validateFile = (req, res, next) => {
    if (!req.file) {
        return next(new ApiError(400, 'No file uploaded'));
    //   return res.status(400).json({ error: 'No file uploaded' });
    }
  
    const { error } = validateFileSchema.validate({
      mimetype: req.file.mimetype,
      size: req.file.size,
    }, { abortEarly: false });
  
    if (error) {
      // Clean up the uploaded file if validation fails
      fs.unlink(req.file.path).catch((err) => console.error('Cleanup failed:', err));
      const errors = error.details[0].message;
    return  next(new ApiError(400, errors));
  
    }
  
   return next(); 
  };

  module.exports = validateFile;