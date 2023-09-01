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

  //mark completed by diagnostic center
  diagnosisReqRouter.put(
    "/mark-as-completed/:reqNo/:diagnoCenterId",
    diagnosisReqController.markCompleted
  );

  // get diagnosis test completed histories
  diagnosisReqRouter.get(
    "/history/:diagnoCenterId",
    diagnosisReqController.fetchHistory
  );
  app.use("/api/services/diagnosis-reqs", diagnosisReqRouter);
};
