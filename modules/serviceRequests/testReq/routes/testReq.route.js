const testReqRouter = require("express").Router();
const testReqController = require("../controllers/testReq.controller.js");
const invImageUploadMulter = require("../../../../middlewares/uploadInvestigationImage.js");

module.exports = (app) => {
  // create test request
  testReqRouter.post("/", testReqController.create);

  // upload investigation image file
  testReqRouter.post(
    "/upload-image",
    invImageUploadMulter,
    testReqController.uploadInvImage
  );

  // fetch all requests by me for test
  testReqRouter.get("/:userId", testReqController.getAll);

  // cancel a request
  testReqRouter.post("/cancel/:reqId", testReqController.cancelRequest);

  // confirm testDiagnostic Response
  testReqRouter.put("/confirm/:reqId", testReqController.confirm);

  app.use("/api/services/request/test", testReqRouter);
};
