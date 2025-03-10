const joi = require('joi');
     
const envVarSchema = joi.object({
  PORT: joi.number().positive().default(7000),
  NODE_ENV: joi.string().required(),
}).unknown();
 
module.exports = envVarSchema;