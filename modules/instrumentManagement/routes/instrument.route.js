module.exports = (app) => {
  const InstrumentRouter = require("express").Router();
  const InstrumentController = require("../controllers/instrument.contriller");

  // Create a new Inst
  InstrumentRouter.post("/", InstrumentController.create);
  // Retrieve all Inst
  InstrumentRouter.get("/", InstrumentController.findAll);
  // Retrieve a single Inst with id
  InstrumentRouter.get("/:id", InstrumentController.findOne);
  // Update a Inst with id
  InstrumentRouter.put("/:id", InstrumentController.update);
  // Delete a Inst with id
  InstrumentRouter.delete("/:id", InstrumentController.delete);
  // Delete all Inst
  InstrumentRouter.delete("/", InstrumentController.deleteAll);

  // Get Unit Name and Id
  InstrumentRouter.get("/unit/data", InstrumentController.getUnitId);
  // Get Category Name and Id
  InstrumentRouter.get("/category/data", InstrumentController.getCatId);

  app.use("/api/instruments", InstrumentRouter);
};
