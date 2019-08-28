const winston = require('winston');
const env = process.env.NODE_ENV;
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
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

if (env!== 'production') {
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

module.exports=logger;
