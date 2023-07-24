module.exports = (app) => {
  const CountryRouter = require("express").Router();
  const CountryController = require("../controllers/country.controller");

  // Create a new Inst
  CountryRouter.post("/", CountryController.create);
  // Retrieve all Inst
  CountryRouter.get("/", CountryController.findAll);
  // Retrieve a single Inst with id
  CountryRouter.get("/:id", CountryController.findOne);
  // Update a Inst with id
  CountryRouter.put("/:id", CountryController.update);
  // Delete a Inst with id
  CountryRouter.delete("/:id", CountryController.delete);
  // Delete all Inst
  CountryRouter.delete("/", CountryController.deleteAll);

  app.use("/api/country", CountryRouter);
};
