const diagnosisReqRouter = require("express").Router();
const diagnosisReqController = require("../controllers/diagnosisReq.controller");

module.exports = (app) => {
  // fetch request for diagnostic center
  diagnosisReqRouter.get("/:diagnoAccId", diagnosisReqController.getAll);

  app.use("/api/services/diagnosis-reqs", diagnosisReqRouter);
};
