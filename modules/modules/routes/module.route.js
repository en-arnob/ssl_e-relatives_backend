
module.exports = app => {

    const moduleRouter = require("express").Router();
    const moduleController = require("../controllers/module.controller");

    // Create a new Post
    moduleRouter.post("/", moduleController.create);
    // Retrieve all Posts
    moduleRouter.get("/", moduleController.findAll);
    // Retrieve a single Post with id
    moduleRouter.get("/:id", moduleController.findOne);
    // Update a Post with id
    moduleRouter.put("/:id", moduleController.update);
    // Delete a Post with id
    moduleRouter.delete("/:id", moduleController.delete);
    // Delete all Posts
    moduleRouter.delete("/", moduleController.deleteAll);

    app.use("/api/module", moduleRouter);


}