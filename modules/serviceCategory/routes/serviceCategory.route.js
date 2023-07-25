module.exports = (app) => {
  const ServiceCategoryRouter = require("express").Router();
  const ServiceCategory = require("../controllers/serviceCategory.controller");

  //create a post
  ServiceCategoryRouter.post("/", ServiceCategory.create);
  // Retrieve all Posts
  ServiceCategoryRouter.get("/", ServiceCategory.findAll);
  // Retrieve a single Post with id
  ServiceCategoryRouter.get("/:id", ServiceCategory.findOne);
  // Update a Post with id
  ServiceCategoryRouter.put("/:id", ServiceCategory.update);
  // Delete a Post with id
  ServiceCategoryRouter.delete("/:id", ServiceCategory.delete);
  // Delete all Posts
  ServiceCategoryRouter.delete("/", ServiceCategory.deleteAll);

  //Find ServiceCategory by roleId
  ServiceCategoryRouter.get("/findbyrole/:roleId", ServiceCategory.findByRole);

  app.use("/api/service-category", ServiceCategoryRouter);
};
