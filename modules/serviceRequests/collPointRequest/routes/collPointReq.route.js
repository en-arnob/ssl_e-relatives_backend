
const collPointReqRouter = require("express").Router();
const collPointReqController = require("../controllers/collPointReq.Controller.js");

module.exports = (app) => {
  collPointReqRouter.get("/:collectionPoint", collPointReqController.getAll);
  collPointReqRouter.post("/:donor_id", collPointReqController.editStatusByDonor);
  app.use("/api/services/coll-point-requests", collPointReqRouter);
};
