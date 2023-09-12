const db = require("../../../../config/database.config");
const TestReq = db.model.testReq;
const User = db.model.user;
const UserDetails = db.model.UserDetails;
const TestDiagnoResponse = db.model.testDiagnoRes;
const Investigation = db.model.investigation;
const errorResponse = require("../../../../utils/errorResponse");
const successResponse = require("../../../../utils/successResponse");
const { Op, Sequelize } = require("sequelize");
const axios = require("axios");

exports.getAll = async (req, res) => {
  const { diagnoAccId } = req.params;
  try {
    const diagnosticCenter = await User.findOne({
      attributes: ["id", "f_name"],
      where: {
        id: diagnoAccId,
      },
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: UserDetails,
          attributes: ["city_id"],
        },
      ],
    });
    const diagnoCity = diagnosticCenter?.user_detail?.city_id;
    const testRequests = await TestReq.findAll({
      include: {
        model: User,
        as: "test_requester",
        attributes: ["id", "f_name"],
        include: {
          model: UserDetails,
          attributes: ["id", "city_id"],
        },
      },
      where: {
        "$test_requester.user_detail.city_id$": diagnoCity,
        [Op.or]: [
          { service_center_id: null },
          { service_center_id: diagnoAccId },
        ],
      },
    });
    if (testRequests) {
      successResponse(200, "OK", testRequests, res);
    }
  } catch (error) {
    errorResponse(
      500,
      "ERROR",
      error.message || "Some error occurred while Finding data",
      res,
    );
  }
};

exports.saveResponse = async (req, res) => {
  const { reqNo } = req.params;
  const body = req.body;
  const data = body.table;
  // console.log(body);
  const discountType = parseInt(req.body.discountType);
  const discountValue = parseInt(req.body.discountValue);

  try {
    for (const obj of data) {
      await TestDiagnoResponse.create({
        req_no: reqNo,
        service_center_id: obj.serviceCenterId,
        investigation: obj.investigation,
        cost: obj.cost,
        discount_type: discountType,
        discount_value: discountValue,
      });
    }
    const updateRequest = await TestReq.update(
      {
        status: 1,
      },
      {
        where: {
          req_no: reqNo,
        },
      },
    );
    const totalCost = await TestDiagnoResponse.findAll({
      where: { req_no: reqNo },
      attributes: [
        "service_center_id",
        [Sequelize.fn("SUM", Sequelize.col("cost")), "total_amount"],
      ],
      raw: true,
    });
    if (totalCost) {
      // console.log(totalCost);
      const totalCostDirectVariable = totalCost[0]?.total_amount;

      console.log(totalCostDirectVariable);

      function getDiscountedPrice(cost, discountType, discountValue) {
        if (discountType === 1) {
          return (
            parseInt(cost) - parseInt(cost) * (parseInt(discountValue) / 100)
          );
        } else if (discountType === 2) {
          return parseInt(cost) - parseInt(discountValue);
        } else {
          return totalCostDirectVariable;
        }
      }

      const priceWithDiscount = getDiscountedPrice(
        totalCostDirectVariable,
        discountType,
        discountValue,
      );
      console.log(priceWithDiscount);
      // console.log(totalCostDirectVariable);
      const message = `A New Bill Offered with Tk ${priceWithDiscount} Please check and accept for further procedure. This bill will be valid for 3 days. Website: https://e-relatives.com`;
      const testReq = await TestReq.findOne({
        where: {
          req_no: reqNo,
        },
        include: {
          model: User,
          as: "test_requester",
          attributes: ["id", "f_name", "mobile"],
        },
      });
      if (testReq) {
        axios
          .post(
            `https://api.greenweb.com.bd/api.php?token=${process.env.SMS_API_TOKEN}&to=${testReq.test_requester.mobile}&message=${message}`,
          )
          .then(() => {
            console.log(`Sent to ${testReq.test_requester.mobile}`);
          })
          .catch((error) => {
            console.log("error");
          });
      }
      successResponse(200, "OK", totalCost, res);
    }
  } catch (error) {
    errorResponse(
      500,
      "ERROR",
      error.message || "Some error occurred while Creating Request",
      res,
    );
  }
};

exports.getAllResponses = async (req, res) => {
  const { reqNo } = req.params;
  try {
    const responses = await TestDiagnoResponse.findAll({
      include: [
        {
          model: User,
          as: "diagno_responder",
          attributes: ["id", "f_name", "address_1"],
        },
        {
          model: Investigation,
          as: "investigationDetails",
          attributes: ["id", "name"],
        },
      ],
      where: {
        req_no: reqNo,
      },
    });
    if (responses) {
      successResponse(200, "OK", responses, res);
    }
  } catch (error) {
    errorResponse(
      500,
      "ERROR",
      error.message || "Some error occurred while Creeating Request",
      res,
    );
  }
};

exports.getSavedResponse = async (req, res) => {
  const { reqNo, serviceCenterId } = req.params;
  try {
    const responses = await TestDiagnoResponse.findAll({
      include: [
        {
          model: Investigation,
          as: "investigationDetails",
          attributes: ["id", "name", "detailed_name"],
        },
      ],
      where: {
        req_no: reqNo,
        service_center_id: serviceCenterId,
      },
    });
    if (responses) {
      successResponse(200, "OK", responses, res);
    }
  } catch (e) {
    errorResponse(
      500,
      "ERROR",
      e.message || "Some error occurred while Creeating Request",
      res,
    );
  }
};

exports.markCompleted = async (req, res) => {
  const { reqNo, diagnoCenterId } = req.params;
  try {
    const markedOnComplete = await TestReq.update(
      {
        status: 4,
        completed_by: diagnoCenterId,
      },
      {
        where: {
          req_no: reqNo,
        },
      },
    );

    if (markedOnComplete[0] === 0) {
      return errorResponse(
        404,
        "NOT_FOUND",
        "No request found with given reqId",
        res,
      );
    }

    const testReq = await TestReq.findOne({
      where: {
        req_no: reqNo,
      },
      include: {
        model: User,
        as: "test_requester",
        attributes: ["id", "f_name", "mobile"],
      },
    });
    // const responseTableData = await TestDiagnoResponse.findAll({
    //   where: {
    //     req_no: reqNo,
    //   },
    // });

    const message = `Specimen received. Your Investigation No: ${reqNo} Report Delivery schedule will updated soon. Website: https://e-relatives.com`;
    if (testReq) {
      axios
        .post(
          `https://api.greenweb.com.bd/api.php?token=${process.env.SMS_API_TOKEN}&to=${testReq.test_requester.mobile}&message=${message}`,
        )
        .then(() => {
          console.log(`Sent to ${testReq.test_requester.mobile}`);
        })
        .catch((error) => {
          console.log("error");
        });
    }
    successResponse(200, "OK", markedOnComplete, res);
  } catch (error) {}
};

exports.fetchHistory = async (req, res) => {
  const { diagnoCenterId } = req.params;
  try {
    const testHistory = await TestReq.findAll({
      include: {
        model: User,
        as: "test_requester",
        attributes: ["id", "f_name"],
      },
      where: {
        completed_by: diagnoCenterId,
        status: 4,
      },
      order: [["id", "DESC"]],
    });
    if (testHistory) {
      successResponse(200, "OK", testHistory, res);
    }
  } catch (error) {
    errorResponse(
      500,
      "ERROR",
      error.message || "Some error occurred while Finding data",
      res,
    );
  }
};

exports.fetchHistoryUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const testHistory = await TestReq.findAll({
      include: {
        model: User,
        as: "service_center",
        attributes: ["id", "f_name"],
      },
      where: {
        user_id: userId,
        status: 4,
      },
      order: [["id", "DESC"]],
    });
    if (testHistory) {
      successResponse(200, "OK", testHistory, res);
    }
  } catch (error) {
    errorResponse(
      500,
      "ERROR",
      error.message || "Some error occurred while Finding data",
      res,
    );
  }
};
