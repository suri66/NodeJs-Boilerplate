const mongoose = require("mongoose");
const logger = require("../logger/logger");
const dbURI = "mongodb://localhost/nodeboilerdb";

function connect() {
  logger.info("Connecting database...");
  try {
    mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    // Successfully connected
    mongoose.connection.on("connected", function() {
      logger.info("Mongoose default connection open to " + dbURI);
    });

    // If the connection throws an error
    mongoose.connection.on("error", function(err) {
      logger.error("Mongoose default connection error: " + err);
    });

    // Connection is disconnected
    mongoose.connection.on("disconnected", function() {
      logger.info("Mongoose default connection disconnected");
    });

    // Mongoose connection gracefully shutdown
    process.on("SIGINT", function() {
      mongoose.connection.close(function() {
        logger.info(
          "Mongoose default connection disconnected through app termination"
        );
        process.exit(0);
      });
    });
  } catch (error) {
    logger.error(error);
  }
}

module.exports = {
  connect: connect
};
