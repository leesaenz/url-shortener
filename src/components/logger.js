const winston = require('winston');

const env = process.env.NODE_ENV;

const logger = new winston.Logger({
  transports: [
    new (winston.transports.Console)({
      // handleExceptions: true,
      // json: true,
    }),
    new (winston.transports.File)({
      name: 'info',
      filename: 'src/logs/app.log',
      level: 'info',
    }),
    new (winston.transports.File)({
      name: 'error',
      filename: 'src/logs/error.log',
      level: 'error',
    }),
  ],
  exitOnError: false,
});

module.exports = logger;
module.exports.stream = {
  write: (message) => {
    logger.info(message);
  },
};
