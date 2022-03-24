import { format, LoggerOptions, transports } from 'winston';

/**
 * debug -> info -> error
 */

export function getWinstonLoggerOption(
  nodeEnv = process.env.NODE_ENV,
): LoggerOptions {
  const isLocalEnv = ['local', 'test', undefined].includes(nodeEnv);
  const level = isLocalEnv ? 'debug' : 'info';

  return {
    silent: nodeEnv === 'test',
    transports: [
      new transports.Console({
        level: level,
        format: isLocalEnv
          ? getLocalFormat()
          : getProductionFormat(),
      }),
    ],
  };
}

function getLocalFormat() {
  return format.combine(
    // format.label({ label: `[${moduleName}]` }),
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.ms(),
    format.prettyPrint(),
  );
}

function getProductionFormat() {
  return format.combine(
    // format.label({ label: `[${moduleName}]` }),
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.ms(),
    format.json(),
    format.printf(({ level, ...args }) => {
      return JSON.stringify({
        level,
        status: level,
        ...args,
      });
    }),
  );
}
