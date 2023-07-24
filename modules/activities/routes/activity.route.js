
module.exports = app => {

    const activityRouter = require("express").Router();
    const activityController = require("../controllers/activity.controller");

    // Create a new Post
    activityRouter.post("/", activityController.create);
    // Retrieve all Posts
    activityRouter.get("/", activityController.findAll);
    // Retrieve a single Post with id
    activityRouter.get("/:id", activityController.findOne);
    // Update a Post with id
    activityRouter.put("/:id", activityController.update);
    // Delete a Post with id
    activityRouter.delete("/:id", activityController.delete);
    // Delete all Posts
    activityRouter.delete("/", activityController.deleteAll);

    app.use("/api/activity", activityRouter);


}