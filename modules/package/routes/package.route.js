const packageRouter = require("express").Router();
const packageController = require("../controllers/package.controller");

module.exports = (app) => {
  // e-rel new methods
  packageRouter.post("/", packageController.create);
  packageRouter.get("/", packageController.getAll);

  app.use("/api/package-management", packageRouter);
};
