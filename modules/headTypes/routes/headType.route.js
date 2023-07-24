
module.exports = app => {

    const headTypeRouter = require("express").Router();
    const headTypeController = require("../controllers/headType.controller");

    // Create a new Post
    headTypeRouter.post("/", headTypeController.create);
    // Retrieve all Posts
    headTypeRouter.get("/", headTypeController.findAll);
    // Retrieve a single Post with id
    headTypeRouter.get("/:id", headTypeController.findOne);
    // Update a Post with id
    headTypeRouter.put("/:id", headTypeController.update);
    // Delete a Post with id
    headTypeRouter.delete("/:id", headTypeController.delete);
    // Delete all Posts
    headTypeRouter.delete("/", headTypeController.deleteAll);

    app.use("/api/head-type", headTypeRouter);


}