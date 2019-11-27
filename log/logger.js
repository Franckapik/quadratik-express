const winston = require('winston');
const env = process.env.NODE_ENV;
/* Voici la hierarchie const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  verbose: 4,
  debug: 5,
  silly: 6
};*/

const logger = winston.createLogger({
  level: env!== 'production' ? 'debug' : 'info', //le niveau affiché au npm start
  format:
    winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
  ),
  transports: [
    new winston.transports.File({ filename: 'log/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'log/combined.log' })
  ]
});

if (env!== 'production') { //console dvp sans precision de level
  logger.add(
    new winston.transports.Console({
    format: winston.format.combine(
    winston.format.colorize(),
    winston.format.prettyPrint(),
    winston.format.splat(),
    winston.format.simple(),
    winston.format.printf(
      info =>
        `${info.timestamp} ${info.level} : ${info.message}`
    )
  )
  }));
}

if (env== 'production') { //console production avec le level warn
  logger.add(
    new winston.transports.Console({
    level:'warn',
    format: winston.format.combine(
    winston.format.colorize(),
    winston.format.prettyPrint(),
    winston.format.splat(),
    winston.format.simple(),
    winston.format.printf(
      info =>
        `${info.timestamp} ${info.level} : ${info.message}`
    )
  )
  }));
}

logger.stream = {
    write: function(message, encoding){
        logger.verbose(message);
    }
};

module.exports=logger;
