require("dotenv").config();
const express = require("express");
const AppError = require("./utils/appError");
const errorHandler = require("./utils/errorHandler");
const db = require("./config/database.config.js");
const app = express();
const path = require("path");

// initialize http cors
require("./config/cors.config.js")(app);

// parse requests of content-type - application/json
app.use(express.json({ limit: "50mb" }));
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ limit: "50mb", extended: false }));

// route level error handler
app.use(errorHandler);

app.use(express.static("uploads"));
app.use(express.static("xrayfile"));
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
//   res.header("Access-Control-Allow-Headers", "X-Requested-With");
//   res.header("Access-Control-Allow-Headers", "Content-Type");
//   res.header("Access-Control-Max-Age", "3600");
//
//   next();
// });

// database connectivity
db.sequelize.sync().then(() => {
  console.log("Database Connected Successfully!!");

  // comment-out bellow code after first run
  // db.model.systemSetting.create({
  //   id: 1,
  //   website_name: "EDMC",
  //   tag_line: "Syscon Solution Ltd.",
  //   address: "This is address",
  //   mobile: "01XXXXXXX",
  //   logo_image: "logo image location",
  //   fav_image: "favorite image location",
  //   copyright: "2023, Syscon Solution",
  //   created_by: 1,
  //   updated_by: 1
  // })
});

// initialize all custom route
require("./config/route.config.js")(app);

// app level error handler
// app.all("*", (req, res, next) => {
//   next(new AppError(`The URL ${req.originalUrl} does not exists`, 404));
// });

// app.use(express.static(path.join(__dirname, "/build")));
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "build", "index.html"));
// });

// set port, listen for requests
const PORT = process.env.SERVER_PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});
