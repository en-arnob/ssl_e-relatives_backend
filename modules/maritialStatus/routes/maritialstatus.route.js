module.exports = (app) => {
  const MaritalRouter = require("express").Router();
  const MaritalController = require("../controllers/maritialstatus.controller");

  // Create a new Inst
  MaritalRouter.post("/", MaritalController.create);
  // Retrieve all Inst
  MaritalRouter.get("/", MaritalController.findAll);
  // Retrieve a single Inst with id
  MaritalRouter.get("/:id", MaritalController.findOne);
  // Update a Inst with id
  MaritalRouter.put("/:id", MaritalController.update);
  // Delete a Inst with id
  MaritalRouter.delete("/:id", MaritalController.delete);
  // Delete all Inst
  MaritalRouter.delete("/", MaritalController.deleteAll);

  app.use("/api/marital-status", MaritalRouter);
};
