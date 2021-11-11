const log4js = require("log4js");
log4js.configure({
  appenders: {
    capturelog: {
      type: "file",
      filename: "logs/capturelog.log",
      maxLogSize: 100000
    }
  },
  categories: { default: { appenders: ["capturelog"], level: "info" } }
});
const logger = log4js.getLogger("capturelog");

module.exports = logger;
