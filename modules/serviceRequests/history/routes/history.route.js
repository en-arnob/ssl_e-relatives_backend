const historyRouter = require("express").Router();
const historyController = require("../controllers/history.controller");

module.exports = (app) => {
  historyRouter.get("/:userId", historyController.getAll);

  app.use("/api/services/service-history", historyRouter);
};
