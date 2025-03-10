const joi = require('joi');
     
const validateFileSchema = joi.object({
    mimetype: joi.string()
      .valid(
        'application/pdf',                                     // PDF
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // Word (.docx)
        'image/jpeg',                                          // JPEG
        'image/png'                                            // PNG
      )
      .required()
      .messages({
        'any.only': 'File must be a PDF, Word document (.docx), JPEG, or PNG',
        'any.required': 'File type is missing',
      }),
    size: joi.number()
      .max(100 * 1024 * 1024) // Max 100MB
      .required()
      .messages({ 
        'number.max': 'File size must not exceed 100MB',
        'any.required': 'File size is missing',
      }),
    // To remove size limit entirely, comment out the 'size' field above and use:
    // size: Joi.number().required().messages({
    //   'any.required': 'File size is missing',
    // }),
  });
 
module.exports = {
  validateFileSchema,
};