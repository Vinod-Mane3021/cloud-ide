import winston, { format } from "winston";
const { combine, colorize, simple, timestamp, printf } = format;
import { format as dateFormat } from "date-fns";

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} | ${level}: ${message}`;
});

const winstonLogger = winston.createLogger({
  level: "info",
  format: combine(
    colorize(),
    simple(),
    timestamp({
      format: () => dateFormat(new Date(), "dd-MM-yyyy hh:mm:ss"),
    }),
    myFormat
  ),
  transports: [new winston.transports.Console()],
});

export { winstonLogger };
