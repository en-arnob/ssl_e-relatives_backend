const diagnosisReqRouter = require("express").Router();
const diagnosisReqController = require("../controllers/diagnosisReq.controller");

module.exports = (app) => {
  // fetch request for diagnostic center
  diagnosisReqRouter.get("/:diagnoAccId", diagnosisReqController.getAll);

  // save diagnosis center response
  diagnosisReqRouter.post("/:reqNo", diagnosisReqController.saveResponse);

  //fetch all diagnosis center response by test request no
  diagnosisReqRouter.get(
    "/get-responses/:reqNo",
    diagnosisReqController.getAllResponses
  );
  app.use("/api/services/diagnosis-reqs", diagnosisReqRouter);
};
