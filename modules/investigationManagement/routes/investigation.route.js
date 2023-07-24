module.exports = (app) => {
  const InvestigationRouter = require("express").Router();
  const InvestigationController = require("../controllers/investigation.controller");

  // Create a new Investigation
  InvestigationRouter.post("/", InvestigationController.create);
  // Retrieve all State
  InvestigationRouter.get("/", InvestigationController.getAll);
  // Retrieve a single State with id
  InvestigationRouter.get("/:id", InvestigationController.findOne);
  // Update a State with id
  InvestigationRouter.put("/:id", InvestigationController.update);
  // Delete a State with id
  InvestigationRouter.delete("/:id", InvestigationController.delete);
  // Delete all State
  // StateRouter.delete("/", StateController.deleteAll);

  // Get Room Name and Id
  InvestigationRouter.get("/room/data", InvestigationController.getRoomData);
  // Get Group Name and Id
  InvestigationRouter.get("/group/data", InvestigationController.getGroupData);
  // Get Category Name and Id
  InvestigationRouter.get(
    "/category/data/:id",
    InvestigationController.getCategoryData
  );
  // Get Instrument Name, Id  and Unit
  InvestigationRouter.get(
    "/instrument/data",
    InvestigationController.getInstrumentData
  );
  // Get Instruments from investigation_to_instruments table
  InvestigationRouter.get(
    "/investigation-instruments/:id",
    InvestigationController.getInvInst
  );

  app.use("/api/investigation", InvestigationRouter);
};
