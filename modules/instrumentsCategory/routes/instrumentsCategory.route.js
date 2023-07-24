module.exports = (app) => {
  const InstrumentsCatRouter = require("express").Router();
  const InstrumentsCatController = require("../controllers/instrumentsCategory.controller");

  // Create a new UOM
  InstrumentsCatRouter.post("/", InstrumentsCatController.create);
  // Retrieve all UOMs
  InstrumentsCatRouter.get("/", InstrumentsCatController.findAll);
  // Retrieve a single UOM with id
  InstrumentsCatRouter.get("/:id", InstrumentsCatController.findOne);
  // Update a UOM with id
  InstrumentsCatRouter.put("/:id", InstrumentsCatController.update);
  // Delete a UOM with id
  InstrumentsCatRouter.delete("/:id", InstrumentsCatController.delete);
  // Delete all UOMs
  InstrumentsCatRouter.delete("/", InstrumentsCatController.deleteAll);

  app.use("/api/instruments-category", InstrumentsCatRouter);
};
