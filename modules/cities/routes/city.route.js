module.exports = (app) => {
  const CityRouter = require("express").Router();
  const CityController = require("../controllers/city.controller");

  // Create a new City
  CityRouter.post("/", CityController.create);
  // Retrieve all City
  CityRouter.get("/", CityController.getAll);
  // Retrieve a City State with id
  CityRouter.get("/:id", CityController.findOne);
  // Update a City with id
  CityRouter.put("/:id", CityController.update);
  // Delete a City with id
  CityRouter.delete("/:id", CityController.delete);
  // Delete all City
  // StateRouter.delete("/", CityController.deleteAll);

  // Get Country Name and Id
  CityRouter.get("/country/data", CityController.getCountryId)
  // Get State Name and Id
  CityRouter.get("/state/data/:id", CityController.getStateId)

  app.use("/api/city", CityRouter);
};
