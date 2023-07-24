module.exports = (app) => {
  const InvestigationGoupRouter = require("express").Router();
  const InvestigationGoupController = require("../controllers/investigationGroup.controller");

  // Create a new Prof
  InvestigationGoupRouter.post("/", InvestigationGoupController.create);
  // Retrieve all Prof
  InvestigationGoupRouter.get("/", InvestigationGoupController.getAll);
  // Retrieve a single Prof with id
  InvestigationGoupRouter.get("/:id", InvestigationGoupController.findOne);
  // Update a Prof with id
  InvestigationGoupRouter.put("/:id", InvestigationGoupController.update);
  // Delete a Prof with id
  InvestigationGoupRouter.delete("/:id", InvestigationGoupController.delete);
  // Delete all Prof
  InvestigationGoupRouter.delete("/", InvestigationGoupController.deleteAll);

  app.use("/api/investigation-groups", InvestigationGoupRouter);
};
