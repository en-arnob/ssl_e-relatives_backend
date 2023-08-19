const reqByMeRouter = require("express").Router();
const reqByMeController = require("../controllers/reqByMe.controller");

module.exports = (app) => {
  reqByMeRouter.get("/:userId", reqByMeController.getAll);
  reqByMeRouter.get("/donors/:reqId/:userId", reqByMeController.getDonors);
  reqByMeRouter.post("/cancel/:reqId", reqByMeController.cancelRequest);

  app.use("/api/services/requests-by-me", reqByMeRouter);
};
