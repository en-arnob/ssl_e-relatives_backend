const reqForTestRouter = require("express").Router();
const reqForTestController = require("../controllers/reqForTest.controller");
module.exports = (app) => {
  reqForTestRouter.get("/", reqForTestController.getAllName);
  reqForTestRouter.get("/service", reqForTestController.getServiceCenters);

  app.use("/api/services/req-for-test", reqForTestRouter);
};
