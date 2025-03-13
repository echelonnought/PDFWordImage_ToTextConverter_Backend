const serverless = require('serverless-http');
const app = require('../server');
const config = require('../config/config');
const logger = require('../config/logger');

const unExpectedErrorHandler = (error) => {
  logger.error('Unhandled error:', error);
  throw error;
};

process.on('uncaughtException', unExpectedErrorHandler);
process.on('unhandledRejection', unExpectedErrorHandler);
process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
});

module.exports.handler = serverless(app);