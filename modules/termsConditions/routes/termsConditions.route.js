module.exports = (app) => {
  const TermConRouter = require("express").Router();
  const TermConController = require("../controllers/termsConditions.controller");

  TermConRouter.get("/:id", TermConController.getData);
  TermConRouter.post("/", TermConController.saveData);
  //   TermConRouter.get("/:id", TermConController.getAll);

  app.use("/api/terms-conditions", TermConRouter);
};
