const bloodReqRouter = require("express").Router();
const bloodReqController = require("../controllers/bloodReq.controller");

module.exports = (app) => {
  // e-rel new methods
  bloodReqRouter.post("/", bloodReqController.create);
  //   bloodReqRouter.get("/details/user/:id", userController.getDetails);

  app.use("/api/services/request/blood", bloodReqRouter);
};
