const paymentGatewayRouter = require("express").Router();
const paymentGatewayController = require("../controllers/payment.gateway.controller");

module.exports = (app) => {
  // pay now
  paymentGatewayRouter.post("/paynow", paymentGatewayController.paynow);

  // ipn
  paymentGatewayRouter.post("/ipn", paymentGatewayController.ipn);

  app.use("/api/payment-gateway/ssl", paymentGatewayRouter);
};
