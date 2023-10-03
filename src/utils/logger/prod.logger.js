import winston from "winston";

const customlevelsOptions = {
  levels: {
    fatal: 0,
    error: 1,
    warning: 2,
    info: 3,
    http: 4,
    debug: 5,
  },
  colors: {
    fatal: "red",
    error: "magneta",
    warning: "yellow",
    info: "blue",
    http: "green",
    debug: "white",
  },
};
winston.addColors(customlevelsOptions.colors);
const logger = winston.createLogger({
  levels: customlevelsOptions.levels,
  transports: [
    new winston.transports.Console({
      level: "info",
      format: winston.format.combine(
        winston.format.timestamp({
          format: "MM-DD-YYYY HH:mm:ss",
        }),
        winston.format.colorize({ colors: customlevelsOptions.colors }),
        winston.format.simple(),
        winston.format.printf(
          (info) => `${info.level} | ${info.timestamp} | ${info.message}`
        )
      ),
    }),
    new winston.transports.File({ filename: "./errors.log" }),
  ],
});

export const loggerProd = (req, res, next) => {
  req.logger = logger;

  next();
};
