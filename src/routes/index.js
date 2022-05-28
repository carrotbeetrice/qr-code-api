module.exports = (app) => {
  app.use("/auth", require("./authRoutes"));
  app.use("/qr", require("./protectedRoutes"));
};
