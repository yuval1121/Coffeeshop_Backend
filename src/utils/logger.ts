import pino, { Logger, LoggerOptions } from 'pino';

const options: LoggerOptions = {
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
    },
  },
  base: {
    pid: false,
  },
  timestamp: false,
};

export const logger: Logger<LoggerOptions> = pino(options);
