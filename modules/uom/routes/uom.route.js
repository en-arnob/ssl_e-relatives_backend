module.exports = app => {

    const UOMRouter = require("express").Router();
    const UOMController = require("../controllers/uom.controller");

    // Create a new UOM
    UOMRouter.post("/", UOMController.create);
    // Retrieve all UOMs
    UOMRouter.get("/", UOMController.findAll);
    // Retrieve a single UOM with id
    UOMRouter.get("/:id", UOMController.findOne);
    // Update a UOM with id
    UOMRouter.put("/:id", UOMController.update);
    // Delete a UOM with id
    UOMRouter.delete("/:id", UOMController.delete);
    // Delete all UOMs
    UOMRouter.delete("/", UOMController.deleteAll);

    app.use("/api/uom", UOMRouter);


}