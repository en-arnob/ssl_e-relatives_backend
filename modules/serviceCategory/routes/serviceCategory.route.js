
module.exports = app => {

    const staticRouter = require("express").Router();
    const ServiceCategory = require("..//controllers/serviceCategory.controller");

    //create a post
    staticRouter.post("/", ServiceCategory.create);
    // Retrieve all Posts
    staticRouter.get("/", ServiceCategory.findAll);
    // Retrieve a single Post with id
    staticRouter.get("/:id", ServiceCategory.findOne);
    // Update a Post with id
    staticRouter.put("/:id", ServiceCategory.update);
    // Delete a Post with id
    staticRouter.delete("/:id", ServiceCategory.delete);
    // Delete all Posts
    staticRouter.delete("/", ServiceCategory.deleteAll);

    app.use("/api/service-category", staticRouter);

}