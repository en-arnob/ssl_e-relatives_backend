const historyRouter = require("express").Router();
const historyController = require("../controllers/history.controller");

module.exports = (app) => {
  historyRouter.get("/:userId", historyController.getAll);

  // save investigations to blood-req
  historyRouter.post(
    "/save-investigations",
    historyController.saveInvestigations
  );

  app.use("/api/services/service-history", historyRouter);
};
