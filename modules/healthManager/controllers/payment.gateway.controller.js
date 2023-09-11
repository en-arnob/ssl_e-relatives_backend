const SSLCommerzPayment = require("sslcommerz-lts");
const store_id = "erela64f1b64ed3d94";
const store_passwd = "erela64f1b64ed3d94@ssl";
const is_live = false; //true for live, false for sandbox

exports.paynow = (req, res) => {
  const data = {
    total_amount: 600,
    currency: "BDT",
    tran_id: "REF123", // use unique tran_id for each api call
    success_url: "http://localhost:8080",
    fail_url: "http://localhost:3030/fail",
    cancel_url: "http://localhost:8080/health-manager/",
    ipn_url: "http://localhost:3030/ipn",
    shipping_method: "Courier",
    product_name: "Computer.",
    product_category: "Electronic",
    product_profile: "general",
    cus_name: "Customer Name",
    cus_email: "customer@example.com",
    cus_add1: "Dhaka",
    cus_add2: "Dhaka",
    cus_city: "Dhaka",
    cus_state: "Dhaka",
    cus_postcode: "1000",
    cus_country: "Bangladesh",
    cus_phone: "01711111111",
    cus_fax: "01711111111",
    ship_name: "Customer Name",
    ship_add1: "Dhaka",
    ship_add2: "Dhaka",
    ship_city: "Dhaka",
    ship_state: "Dhaka",
    ship_postcode: 1000,
    ship_country: "Bangladesh",
  };

  const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
  sslcz.init(data).then((apiResponse) => {
    // Redirect the user to payment gateway
    // console.log(apiResponse.GatewayPageURL);
    let GatewayPageURL = apiResponse.GatewayPageURL;

    // console.log("Redirecting to: ", GatewayPageURL);
    // res.redirect(GatewayPageURL);
    res.send(GatewayPageURL);
  });
};
