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

  app.use("/api/services/request/test", testReqRouter);
};
