const roleRouter = require("express").Router();
const roleController = require("../controllers/role.controller");

module.exports = (app) => {
  roleRouter.post("/create-role", roleController.create);
  roleRouter.get("/", roleController.findAll);
  roleRouter.get("/role/:id", roleController.findOne);
  roleRouter.put("/role/:id", roleController.update);
  roleRouter.delete("/role/:id", roleController.delete);

  // Roles for new reg from forntend by priority
  roleRouter.get("/:priority", roleController.findByPriority);
  // get roles for  priority 5 & 6
  roleRouter.get("/priority/5/6", roleController.findByPriorityFiveSix);

  app.use("/api/roles", roleRouter);
};
