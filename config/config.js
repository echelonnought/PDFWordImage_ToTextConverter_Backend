require('dotenv').config();
const envVarSchema = require('../validations/env.validation');
const { value: envVars, error } = envVarSchema.validate(process.env);
const logger = require('./logger');
 
if (error) {
  logger.error(`Config validation error: ${error.message}`);
}
 
module.exports = {
  port: envVars.PORT,
  env: envVars.NODE_ENV,
};