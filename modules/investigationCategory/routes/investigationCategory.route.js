module.exports = (app) => {
  const InvestigationCategoryRouter = require("express").Router();
  const InvestigationCategoryController = require("../controllers/investigationCategory.controller");

  // Create a new InvCat
  InvestigationCategoryRouter.post("/", InvestigationCategoryController.create);
  // Retrieve all InvCat
  InvestigationCategoryRouter.get("/", InvestigationCategoryController.getAll);
  // Retrieve a single InvCat with id
  InvestigationCategoryRouter.get(
    "/:id",
    InvestigationCategoryController.findOne
  );
  // Update a InvCat with id
  InvestigationCategoryRouter.put(
    "/:id",
    InvestigationCategoryController.update
  );
  // Delete a InvCat with id
  InvestigationCategoryRouter.delete(
    "/:id",
    InvestigationCategoryController.delete
  );
  // Delete all InvCat
  // InvestigationCategoryRouter.delete("/", InvestigationCategoryController.deleteAll);

  // Get Group Name and Id
  InvestigationCategoryRouter.get(
    "/group/data",
    InvestigationCategoryController.getGroupId
  );

  app.use("/api/investigation-category", InvestigationCategoryRouter);
};
