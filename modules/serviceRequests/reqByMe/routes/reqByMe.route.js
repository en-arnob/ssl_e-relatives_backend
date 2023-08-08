const reqByMeRouter = require("express").Router();
const reqByMeController = require("../controllers/reqByMe.controller");

module.exports = (app) => {
  reqByMeRouter.get("/:userId", reqByMeController.getAll);

  app.use("/api/services/requests-by-me", reqByMeRouter);
};
