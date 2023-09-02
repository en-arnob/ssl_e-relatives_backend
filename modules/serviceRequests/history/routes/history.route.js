const historyRouter = require("express").Router();
const historyController = require("../controllers/history.controller");

module.exports = (app) => {
  // donation history
  historyRouter.get("/:userId", historyController.getAll);

  // blood receive history
  historyRouter.get("/receive/:userId", historyController.getAllRecieved);

  // blood collection history for service center
  historyRouter.get(
    "/collection/:serviceCenterId",
    historyController.getAllCollected,
  );

  // save investigations to blood-req
  historyRouter.post(
    "/save-investigations",
    historyController.saveInvestigations,
  );

  app.use("/api/services/service-history", historyRouter);
};
