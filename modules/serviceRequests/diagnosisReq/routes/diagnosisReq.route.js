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
    diagnosisReqController.getAllResponses,
  );

  //fetch submitted response to render for service center
  diagnosisReqRouter.get(
    "/get-saved-response/:reqNo/:serviceCenterId",
    diagnosisReqController.getSavedResponse,
  );

  //mark completed by diagnostic center
  diagnosisReqRouter.put(
    "/mark-as-completed/:reqNo/:diagnoCenterId",
    diagnosisReqController.markCompleted,
  );

  // get diagnosis test completed histories
  diagnosisReqRouter.get(
    "/history/:diagnoCenterId",
    diagnosisReqController.fetchHistory,
  );
  //get diagnostic test completed history for user
  diagnosisReqRouter.get(
    "/history/user/:userId",
    diagnosisReqController.fetchHistoryUser,
  );

  app.use("/api/services/diagnosis-reqs", diagnosisReqRouter);
};
