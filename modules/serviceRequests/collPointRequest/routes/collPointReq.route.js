
const collPointReqRouter = require("express").Router();
const collPointReqController = require("../controllers/collPointReq.Controller.js");

module.exports = (app) => {
  collPointReqRouter.get("/:userId", collPointReqController.getAll);
  app.use("/api/services/coll-point-requests", collPointReqRouter);
};
