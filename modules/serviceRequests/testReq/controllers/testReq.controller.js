const errorResponse = require("../../../../utils/errorResponse");
const successResponse = require("../../../../utils/successResponse");
require("dotenv").config();
const db = require("../../../../config/database.config");
const axios = require("axios");
const TestReq = db.model.testReq;
const User = db.model.user;
const UserDetails = db.model.UserDetails;

exports.create = async (req, res) => {
  const testdata = req.body;
  try {
    const reqNo = Math.floor(
      1000000000 +
        Math.random() *
          9000000000 *
          Math.floor(1000000000 + Math.random() * 9000000000 * Date.now()),
    )
      .toString()
      .substring(2, 10);
    if (
      parseInt(testdata.selectionType) === 1 &&
      testdata.investigationArr.length > 0
    ) {
      const invCsv = testdata.investigationArr.join(",");
      const newTestReq = await TestReq.create({
        user_id: testdata.userId,
        req_no: reqNo,
        select_type: testdata.selectionType,
        req_type: testdata.reqType,
        service_center_id: testdata.serviceCenter,
        investigation_ids: invCsv,
      });

      // here sms send -> first find user with city id from testdata.userId. Then find service centers with that cityId and extract their phone numbers and send them sms

      let user = await UserDetails.findOne({
        where: {
          user_id: testdata.userId,
        },
        attributes: ["user_id", "city_id"],
      });

      if (user) {
        let userCityId = user.city_id;
        let serviceCenters = await UserDetails.findAll({
          where: {
            city_id: userCityId,
          },
          include: [
            {
              model: User,
              where: {
                role_id: 13,
              },
              attributes: ["role_id", "f_name", "mobile"],
            },
          ],
        });
        if (serviceCenters) {
          const message =
            "Someone submitted a Test List. Please Prepare a Bill (Please submit your bill by 30 Minutes)";

          await serviceCenters.forEach((serviceCenter) => {
            axios
              .post(
                `https://api.greenweb.com.bd/api.php?token=${process.env.SMS_API_TOKEN}&to=${serviceCenter.user.mobile}&message=${message}`,
              )
              .then(() => {
                console.log(`Sent to ${serviceCenter.user.mobile}`);
              })
              .catch((error) => {
                console.log("error");
              });
          });
        }
        successResponse(200, "OK", serviceCenters, res);
      }
    } else if (parseInt(testdata.selectionType) === 2 && testdata.file) {
      const newTestReq = await TestReq.create({
        user_id: testdata.userId,
        req_no: reqNo,
        select_type: testdata.selectionType,
        req_type: testdata.reqType,
        service_center_id: testdata.serviceCenter,
        inv_image: testdata.file,
      });
      // here sms send -> first find user with city id from testdata.userId. Then find service centers with that cityId and extract their phone numbers and send them sms
      let user = await UserDetails.findOne({
        where: {
          user_id: testdata.userId,
        },
        attributes: ["user_id", "city_id"],
      });

      if (user) {
        let userCityId = user.city_id;
        let serviceCenters = await UserDetails.findAll({
          where: {
            city_id: userCityId,
          },
          include: [
            {
              model: User,
              where: {
                role_id: 13,
              },
              attributes: ["role_id", "f_name", "mobile"],
            },
          ],
        });
        if (serviceCenters) {
          // console.log(serviceCenters);
          const message =
            "Someone submitted a Test List. Please Prepare a Bill (Please submit your bill by 30 Minutes)";

          await serviceCenters.forEach((serviceCenter) => {
            axios
              .post(
                `https://api.greenweb.com.bd/api.php?token=${process.env.SMS_API_TOKEN}&to=${serviceCenter.user.mobile}&message=${message}`,
              )
              .then(() => {
                console.log(`Sent to ${serviceCenter.user.mobile}`);
              })
              .catch((error) => {
                console.log("error");
              });
          });
        }
        successResponse(200, "OK", serviceCenters, res);
      }
    } else {
      errorResponse(
        500,
        "ERROR",
        "Some error occurred while Creating Request, Please try providing all information",
        res,
      );
    }
  } catch (err) {
    errorResponse(
      500,
      "ERROR",
      err.message || "Some error occurred while Creeating Request",
      res,
    );
  }
};

exports.uploadInvImage = async (req, res) => {
  try {
    let imageFile = req.file;
    res.send(imageFile);
  } catch (err) {
    errorHandler(
      500,
      "ERROR",
      err.message ||
        "Some error occurred while Finding Users By Date_of_Birth.",
      res,
    );
  }
};

exports.getAll = async (req, res) => {
  const { userId } = req.params;

  try {
    const myReqs = await TestReq.findAll({
      where: {
        user_id: userId,
      },
      order: [["id", "DESC"]],
    });
    myReqs && successResponse(200, "OK", myReqs, res);
  } catch (error) {
    errorResponse(
      500,
      "ERROR",
      error.message || "Some error occurred while fetching data",
      res,
    );
  }
};

exports.getServiceCenters = async (req, res) => {
  console.log("Hello");
  try {
    const serviceCenters = await User.findAll({});
    serviceCenters && successResponse(200, "OK", serviceCenters, res);
  } catch (e) {
    errorResponse(
      500,
      "ERROR",
      e.message || "Some error occurred while fetching data",
      res,
    );
  }
};

exports.cancelRequest = async (req, res) => {
  const { reqId } = req.params;

  try {
    const del = await TestReq.update(
      {
        status: 3,
      },
      {
        where: {
          req_no: reqId,
        },
      },
    );
    if (del[0] === 0) {
      return errorResponse(
        404,
        "NOT_FOUND",
        "No request found with given reqId",
        res,
      );
    }
    successResponse(200, "OK", del, res);
  } catch (err) {
    errorResponse(
      500,
      "ERROR",
      err.message || "Some error occurred while deleting request",
      res,
    );
  }
};

exports.confirm = async (req, res) => {
  const { reqId } = req.params;
  try {
    const confirmationUpdate = await TestReq.update(
      {
        status: 2,
      },
      {
        where: {
          req_no: reqId,
        },
      },
    );
    if (confirmationUpdate[0] === 0) {
      return errorResponse(
        404,
        "NOT_FOUND",
        "No request found with given reqId",
        res,
      );
    }
    successResponse(200, "OK", confirmationUpdate, res);
  } catch (error) {
    errorResponse(
      500,
      "ERROR",
      error.message || "Some error occurred while confirming request",
      res,
    );
  }
};
