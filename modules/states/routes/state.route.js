module.exports = (app) => {
  const StateRouter = require("express").Router();
  const StateController = require("../controllers/state.controller");

  // Create a new State
  StateRouter.post("/", StateController.create);
  // Retrieve all State
  StateRouter.get("/", StateController.getAll);
  // Retrieve a single State with id
  StateRouter.get("/:id", StateController.findOne);
  // Update a State with id
  StateRouter.put("/:id", StateController.update);
  // Delete a State with id
  StateRouter.delete("/:id", StateController.delete);
  // Delete all State
  // StateRouter.delete("/", StateController.deleteAll);

  // Get Country Name and Id
  StateRouter.get("/country/data", StateController.getCountryId);

  app.use("/api/state", StateRouter);
};
