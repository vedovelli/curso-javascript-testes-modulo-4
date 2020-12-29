import { createLogger, transports, config, format } from 'winston';

const { combine, timestamp, json } = format;

const transportList = [new transports.File({ filename: 'logs/combined.log' })];

if (process.env.NODE_ENV === 'development') {
  transportList.push(new transports.Console());
}

export const logger = createLogger({
  levels: config.syslog.levels,
  format: combine(
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    json(),
  ),
  exceptionHandlers: transportList,
  transports: transportList,
});
