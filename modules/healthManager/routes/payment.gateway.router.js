const paymentGatewayRouter = require("express").Router();
const paymentGatewayController = require("../controllers/payment.gateway.controller");

module.exports = (app) => {
  // pay now
  paymentGatewayRouter.get("/paynow", paymentGatewayController.paynow);

  app.use("/api/payment-gateway/ssl", paymentGatewayRouter);
};
