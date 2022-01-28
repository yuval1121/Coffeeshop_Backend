import pino, { LoggerOptions } from 'pino';

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

const logger = pino(options);

export { logger };
