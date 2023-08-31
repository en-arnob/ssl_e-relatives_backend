const diagnosisReqRouter = require("express").Router();
const diagnosisReqController = require("../controllers/diagnosisReq.controller");

module.exports = (app) => {
  // fetch request for diagnostic center
  diagnosisReqRouter.get("/:diagnoAccId", diagnosisReqController.getAll);

  // save diagnosis center response
  diagnosisReqRouter.post("/:reqNo", diagnosisReqController.saveResponse);

  app.use("/api/services/diagnosis-reqs", diagnosisReqRouter);
};
