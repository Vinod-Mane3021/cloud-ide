import { winstonLogger } from "./logger";

const logger = {
  info: winstonLogger.info.bind(winstonLogger),
  warn: winstonLogger.warn.bind(winstonLogger),
  error: winstonLogger.error.bind(winstonLogger),
  debug: winstonLogger.debug.bind(winstonLogger),
  log: winstonLogger.log.bind(winstonLogger),
};

export { logger };
