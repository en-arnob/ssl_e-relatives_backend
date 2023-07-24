module.exports = (app) => {
  const TestMRouter = require("express").Router();
  const TestMController = require("../controllers/testManagement.controller");

  TestMRouter.get("/investigations/", TestMController.getInvestigations);
  TestMRouter.get("/uom-data", TestMController.getUOMData);
  TestMRouter.post("/", TestMController.saveData);
  TestMRouter.get("/:id", TestMController.getAll);

  app.use("/api/test", TestMRouter);
};
