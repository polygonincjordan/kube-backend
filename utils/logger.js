// utils/logger.js
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;

// Define custom log format
const logFormat = printf(({ level, message, timestamp }) => {
    const currentTime = new Date().toISOString();
    return `${currentTime} [${level}]: ${message}`;
});

const logger = createLogger({
    level: 'error', 
    format: combine(
        timestamp(),
        logFormat
    ),
    transports: [
        new transports.Console(),
        new transports.File({ filename: 'error.log', level: 'error' }),
    ]
});

module.exports = logger;
