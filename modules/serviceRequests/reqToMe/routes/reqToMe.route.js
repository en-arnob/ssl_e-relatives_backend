const reqToMeRouter = require("express").Router();
const reqToMeController = require("../controllers/reqToMe.controller");

module.exports = (app) => {
  reqToMeRouter.get("/:userId", reqToMeController.getAll);
  reqToMeRouter.post("/accept/:id/:userId", reqToMeController.accept);

  app.use("/api/services/requests-to-me", reqToMeRouter);
};
