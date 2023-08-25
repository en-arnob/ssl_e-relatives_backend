module.exports = (app) => {
  const InvestigationGoupRouter = require("express").Router();
  const InvestigationGoupController = require("../controllers/investigationGroup.controller");

  // Create a new
  InvestigationGoupRouter.post("/", InvestigationGoupController.create);
  // Retrieve all
  InvestigationGoupRouter.get("/", InvestigationGoupController.getAll);
  // Retrieve a single with id
  InvestigationGoupRouter.get("/:id", InvestigationGoupController.findOne);
  // Update a with id
  InvestigationGoupRouter.put("/:id", InvestigationGoupController.update);
  // Delete a with id
  InvestigationGoupRouter.delete("/:id", InvestigationGoupController.delete);
  // Delete all
  InvestigationGoupRouter.delete("/", InvestigationGoupController.deleteAll);

  app.use("/api/investigation-groups", InvestigationGoupRouter);
};
