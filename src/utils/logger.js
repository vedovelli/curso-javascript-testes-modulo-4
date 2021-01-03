/* istanbul ignore file */
import { createLogger, transports, config, format } from 'winston';

const { combine, timestamp, json } = format;

// Todos os logs são armazenados no arquivo combined.log
const transportList = [new transports.File({ filename: 'logs/combined.log' })];

/**
 * Nota: outros transportes podem ser adicionados, tais como
 * Datadog ou Logly para analisar os logs do servidor usando
 * ferramentas profissionais e com muitos gráficos.
 */

// Esta verificação visa esconder os logs durante os testes
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
  // A linha abaixo captura todas as exceções não gerenciadas: Uncaught Exception
  exceptionHandlers: transportList,
  transports: transportList,
});
