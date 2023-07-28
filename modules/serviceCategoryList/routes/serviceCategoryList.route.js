module.exports = (app) => {
    const ServiceCategoryListRouter = require("express").Router();
    const ServiceCategoryList = require("../controllers/serviceCategoryList.controller");
  console.log(ServiceCategoryList)
    //create a post
    ServiceCategoryListRouter.post("/", ServiceCategoryList.create);
    // Retrieve all Posts
    ServiceCategoryListRouter.get("/", ServiceCategoryList.findAll);
    
    // Retrieve a single Post with id
    // ServiceCategoryListRouter.get("/:id", ServiceCategoryList.findOne);
    // Update a Post with id
    ServiceCategoryListRouter.put("/:id", ServiceCategoryList.update);
    // Delete a Post with id
    ServiceCategoryListRouter.delete("/:id", ServiceCategoryList.delete);
    // Delete all Posts
    // ServiceCategoryListRouter.delete("/", ServiceCategoryList.deleteAll);
  
    //Find ServiceCategory by roleId
    // ServiceCategoryListRouter.get("/findbyrole/:roleId", ServiceCategoryList.findByRole);
  
    app.use("/api/service_category_list", ServiceCategoryListRouter);
  };
  