require("dotenv").config();
const axios = require("axios");
const db = require("../../../config/database.config");
const HealthMan = db.model.healthMan;
const UserPayment = db.model.userPayment;
const User = db.model.user;

const errorResponse = require("../../../utils/errorResponse.js");
const successResponse = require("../../../utils/successResponse.js");

const SSLCommerzPayment = require("sslcommerz-lts");
const store_id = process.env.SSL_STORE_ID;
const store_passwd = process.env.SSL_STORE_PASSWD;
const is_live = false; //true for live, false for sandbox

exports.paynow = async (req, res) => {
  try {
    const obj = req.body;
    // console.log(obj);
    const userRegNo = obj.userReg;
    const timestamp = Date.now();
    // const randomNum = Math.floor(Math.random() * 9000) + 1000;
    const transactionId = userRegNo + "-" + timestamp;
    const userId = obj.userId;
    // console.log(transactionId);

    const data = {
      total_amount: obj?.totalAmount,
      currency: "BDT",
      tran_id: transactionId, // use unique tran_id for each api call
      success_url: "https://e-relatives.com",
      fail_url: "http://localhost:3030/fail",
      cancel_url: "https://e-relatives.com/health-manager/",
      ipn_url: "https://admin.e-relatives.com/api/payment-gateway/ssl/ipn",
      shipping_method: "NO",
      product_name: obj.productName,
      product_category: obj.productCategory,
      product_profile: "general",
      cus_name: obj.userName,
      cus_email: obj.userEmail,
      cus_add1: obj.userAddress,
      // cus_add2: "Dhaka",
      cus_city: "Dhaka",
      cus_state: "Dhaka", // not mandatory
      // cus_postcode: "1000", // not mandatory
      cus_country: "Bangladesh",
      cus_phone: obj.userPhone,
      // cus_fax: "01711111111",
      // ship_name: "Customer Name",
      // ship_add1: "Dhaka",
      // ship_add2: "Dhaka",
      // ship_city: "Dhaka",
      // ship_state: "Dhaka",
      // ship_postcode: 1000,
      // ship_country: "Bangladesh",
    };

    const paymentDataInit = await UserPayment.create({
      user_id: userId,
      tran_id: transactionId,
      product_name: obj.productName,
      product_category: obj.productCategory,
      product_profile: data.product_profile,
      status: 0,
    });

    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
    sslcz.init(data).then((apiResponse) => {
      // Redirect the user to payment gateway
      // console.log(apiResponse.GatewayPageURL);
      let GatewayPageURL = apiResponse.GatewayPageURL;

      // console.log("Redirecting to: ", GatewayPageURL);
      // res.redirect(GatewayPageURL);
      res.send(GatewayPageURL);
    });
  } catch (e) {
    errorResponse(
      500,
      "ERROR",
      e.message || "Some error occurred while payment",
      res,
    );
  }
};

exports.ipn = async (req, res) => {
  try {
    const ipnResponse = req.body;
    // console.log(ipnResponse);
    if (ipnResponse.status === "VALID") {
      const findInitial = await UserPayment.findOne({
        where: {
          tran_id: ipnResponse.tran_id,
        },
      });
      if (findInitial) {
        const update = await UserPayment.update(
          {
            tran_date: ipnResponse.tran_date,
            total_amount: ipnResponse.amount,
            store_amount: ipnResponse.store_amount,
            currency: ipnResponse.currency,
            card_type: ipnResponse.card_type,
            card_brand: ipnResponse.card_brand,
            status: 1,
          },
          {
            where: {
              tran_id: ipnResponse.tran_id,
            },
          },
        );
        const userId = findInitial.user_id;
        const user = await User.findByPk(userId);
        const testMessage = `Dear ${user.f_name}, Your payment for ${findInitial.product_name} Health Manager Subscription is successful. Bill Paid: ${ipnResponse?.amount} BDT`;
        axios
          .post(
            `https://api.greenweb.com.bd/api.php?token=${process.env.SMS_API_TOKEN}&to=${user.mobile}&message=${testMessage}`,
          )
          .then(() => {
            console.log("Message Sent");
            res.status(200).send({ message: "Updated" });
          })
          .catch((error) => {
            console.log("error");
          });
      }
    } else if (ipnResponse.status === "FAILED") {
    } else if (ipnResponse.status === "CANCELLED") {
    } else if (ipnResponse.status === "UNATTEMPTED") {
    } else if (ipnResponse.status === "EXPIRED") {
    }
  } catch (e) {
    errorResponse(
      500,
      "ERROR",
      e.message || "Some error occurred while Creating Package",
      res,
    );
  }
};
