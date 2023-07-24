
module.exports = app => {

    const staticGroupRouter = require("express").Router();
    const staticGroupController = require("../controllers/staticContentGroup.controller");

    //create a post
    staticGroupRouter.post("/", staticGroupController.create);
    // Retrieve all Posts
    staticGroupRouter.get("/", staticGroupController.findAll);
    // Retrieve a single Post with id
    staticGroupRouter.get("/:id", staticGroupController.findOne);
    // Update a Post with id
    staticGroupRouter.put("/:id", staticGroupController.update);
    // Delete a Post with id
    staticGroupRouter.delete("/:id", staticGroupController.delete);
    // Delete all Posts
    staticGroupRouter.delete("/", staticGroupController.deleteAll);

    app.use("/api/static-content-groups", staticGroupRouter);

}