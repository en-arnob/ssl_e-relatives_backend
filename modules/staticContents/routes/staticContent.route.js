
module.exports = app => {

    const staticRouter = require("express").Router();
    const staticController = require("..//controllers/staticContent.controller");

    //create a post
    staticRouter.post("/", staticController.create);
    // Retrieve all Posts
    staticRouter.get("/", staticController.findAll);
    // Retrieve a single Post with id
    staticRouter.get("/:id", staticController.findOne);
    // Update a Post with id
    staticRouter.put("/:id", staticController.update);
    // Delete a Post with id
    staticRouter.delete("/:id", staticController.delete);
    // Delete all Posts
    staticRouter.delete("/", staticController.deleteAll);

    app.use("/api/static-contents", staticRouter);

}