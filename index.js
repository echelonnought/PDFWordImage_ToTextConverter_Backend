const app = require('./server');
const http = require('http');
const config = require('./config/config');
const logger = require('./config/logger');
 // Serve static files from 'public' directory


 if (config.env !== 'production' || !process.platform === 'linux') {
  const httpServer = http.createServer(app);
  const server = httpServer.listen(config.port || 3000, () => {
    logger.info(`Server running at http://localhost:${config.port || 3000}`);
  })};


const exitHandler = () => {
    if (server) {
      server.close(() => {
        console.log('Server closed');
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  };
   
  const unExpectedErrorHandler = (error) => {
    logger.error(error);
    exitHandler();
  };
   
  process.on('uncaughtException', unExpectedErrorHandler);
  process.on('unhandledRejection', unExpectedErrorHandler);
  process.on('SIGTERM', () => {
    logger.info('SIGTERM received');
    if (server) {
      server.close();
    }
  });