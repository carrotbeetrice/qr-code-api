const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { port } = require("./config");
const connectToDb = require("./db");

const startServer = () => {
  const app = express();

  /**
   * Middlewares
   */
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cors());
  app.use(morgan("tiny"));

  // Use routes
  require("./routes")(app);

  connectToDb();

  app.listen(port, () => {
    console.log("Running QR Code API at port", port);
  });
};

startServer();
