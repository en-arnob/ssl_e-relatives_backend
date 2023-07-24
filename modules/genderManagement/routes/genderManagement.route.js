module.exports = app => {

    const GenderRouter = require("express").Router();
    const GenderController = require("../controllers/genderManagement.controller");

    // Create a new UOM
    GenderRouter.post("/", GenderController.create);
    // Retrieve all UOMs
    GenderRouter.get("/", GenderController.findAll);
    // Retrieve a single UOM with id
    GenderRouter.get("/:id", GenderController.findOne);
    // Update a UOM with id
    GenderRouter.put("/:id", GenderController.update);
    // Delete a UOM with id
    GenderRouter.delete("/:id", GenderController.delete);
    // Delete all UOMs
    GenderRouter.delete("/", GenderController.deleteAll);

    app.use("/api/gender", GenderRouter);


}