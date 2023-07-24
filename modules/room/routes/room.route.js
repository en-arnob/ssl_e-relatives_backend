module.exports = (app) => {
  const RoomRouter = require("express").Router();
  const RoomController = require("../controllers/room.controller");

  // Create a new UOM
  RoomRouter.post("/", RoomController.create);
  // Retrieve all UOMs
  RoomRouter.get("/", RoomController.getAll);
  // Retrieve a single UOM with id
  RoomRouter.get("/:id", RoomController.findOne);
  // Update a UOM with id
  RoomRouter.put("/:id", RoomController.update);
  // Delete a UOM with id
  RoomRouter.delete("/:id", RoomController.delete);
  // Delete all UOMs
  RoomRouter.delete("/", RoomController.deleteAll);

  app.use("/api/room", RoomRouter);
};
