const winston = require('winston');
const { format, createLogger, transports } = winston;
const { combine, timestamp, printf, colorize, uncolorize } = format;
const config = require('../config/config');


const winstonFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp}: ${level}: ${stack || message}`;
});

const logger = createLogger({
  level: config.env === 'development' ? 'debug' : 'info',
  format: combine(
    timestamp(),
    winstonFormat,
     config.env === 'development' ? colorize() : uncolorize()
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'error.log', level: 'error' }),
    new transports.File({ filename: 'combined.log' }),
  ],
});

module.exports = logger;