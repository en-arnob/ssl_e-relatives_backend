const packageRouter = require("express").Router();
const packageController = require("../controllers/package.controller");

module.exports = (app) => {
  // create package
  packageRouter.post("/", packageController.create);
  // fetch all package
  packageRouter.get("/", packageController.getAll);
  // delete package
  packageRouter.delete("/:id", packageController.delete);
  // update package
  packageRouter.put("/:id", packageController.update);

  app.use("/api/package-management", packageRouter);
};
