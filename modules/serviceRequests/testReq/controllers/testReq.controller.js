const errorResponse = require("../../../../utils/errorResponse");
const successResponse = require("../../../../utils/successResponse");
require("dotenv").config();
const db = require("../../../../config/database.config");
const axios = require("axios");
const TestReq = db.model.testReq;

exports.create = async (req, res) => {
  const testdata = req.body;
  try {
    const reqNo = Math.floor(
      1000000000 +
        Math.random() *
          9000000000 *
          Math.floor(1000000000 + Math.random() * 9000000000 * Date.now())
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
        investigation_ids: invCsv,
      });
      newTestReq && successResponse(200, "OK", testdata, res);
    } else if (parseInt(testdata.selectionType) === 2 && testdata.file) {
      const newTestReq = await TestReq.create({
        user_id: testdata.userId,
        req_no: reqNo,
        select_type: testdata.selectionType,
        inv_image: testdata.file,
      });
      newTestReq && successResponse(200, "OK", testdata, res);
    } else {
      errorResponse(
        500,
        "ERROR",
        "Some error occurred while Creating Request, Please try providing all information",
        res
      );
    }
  } catch (err) {
    errorResponse(
      500,
      "ERROR",
      err.message || "Some error occurred while Creeating Request",
      res
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
      res
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
      order: [["createdAt", "DESC"]],
    });
    myReqs && successResponse(200, "OK", myReqs, res);
  } catch (error) {
    errorResponse(
      500,
      "ERROR",
      error.message || "Some error occurred while fetching data",
      res
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
      }
    );
    if (del[0] === 0) {
      return errorResponse(
        404,
        "NOT_FOUND",
        "No request found with given reqId",
        res
      );
    }
    successResponse(200, "OK", del, res);
  } catch (err) {
    errorResponse(
      500,
      "ERROR",
      err.message || "Some error occurred while deleting request",
      res
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
      }
    );
    if (confirmationUpdate[0] === 0) {
      return errorResponse(
        404,
        "NOT_FOUND",
        "No request found with given reqId",
        res
      );
    }
    successResponse(200, "OK", confirmationUpdate, res);
  } catch (error) {
    errorResponse(
      500,
      "ERROR",
      error.message || "Some error occurred while confirming request",
      res
    );
  }
};
