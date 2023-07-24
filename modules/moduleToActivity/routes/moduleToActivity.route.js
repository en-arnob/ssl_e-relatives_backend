module.exports = (app) => {
  const moduleRouter = require("express").Router();
  const moduleToActivityController = require("../controllers/moduleToActivity.controller");

  // Create a new Post
  moduleRouter.post("/", moduleToActivityController.create);
  // Retrieve all Posts
  moduleRouter.get("/", moduleToActivityController.findAll);
  // Retrieve a single Post with id
  moduleRouter.get("/:id", moduleToActivityController.findOne);
  // Update a Post with id
  moduleRouter.put("/:id", moduleToActivityController.update);
  // Delete a Post with id
  moduleRouter.delete("/:id", moduleToActivityController.delete);
  // Delete all Posts
  moduleRouter.delete("/", moduleToActivityController.deleteAll);

  app.use("/api/module-to-activity", moduleRouter);
};
