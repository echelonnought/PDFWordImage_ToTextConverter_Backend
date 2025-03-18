const rateLimit = require('express-rate-limit');

const uploadLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 1, // 10 requests per IP
    message: {
      error: 'Too many requests from this IP. Please try again after 15 minutes.',
    },
    standardHeaders: true, // Return rate limit info in headers
    legacyHeaders: false, // Disable older X-RateLimit headers
  });

  module.exports = uploadLimiter;