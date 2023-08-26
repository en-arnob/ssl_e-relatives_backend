const testReqRouter = require("express").Router();
const testReqController = require("../controllers/testReq.controller.js");

module.exports = (app) => {
  // e-rel new methods
  testReqRouter.post("/", testReqController.create);

  app.use("/api/services/request/test", testReqRouter);
};
