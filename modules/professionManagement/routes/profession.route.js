module.exports = (app) => {
  const ProfessionRouter = require("express").Router();
  const ProfessionController = require("../controllers/profession.controller");

  // Create a new Prof
  ProfessionRouter.post("/", ProfessionController.create);
  // Retrieve all Prof
  ProfessionRouter.get("/", ProfessionController.findAll);
  // Retrieve a single Prof with id
  ProfessionRouter.get("/:id", ProfessionController.findOne);
  // Update a Prof with id
  ProfessionRouter.put("/:id", ProfessionController.update);
  // Delete a Prof with id
  ProfessionRouter.delete("/:id", ProfessionController.delete);
  // Delete all Prof
  ProfessionRouter.delete("/", ProfessionController.deleteAll);

  app.use("/api/professions", ProfessionRouter);
};
