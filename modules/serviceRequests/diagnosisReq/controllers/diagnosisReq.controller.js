const db = require("../../../../config/database.config");
const TestReq = db.model.testReq;
const User = db.model.user;
const UserDetails = db.model.UserDetails;
const TestDiagnoResponse = db.model.testDiagnoRes;
const Investigation = db.model.investigation;
const errorResponse = require("../../../../utils/errorResponse");
const successResponse = require("../../../../utils/successResponse");
const { Op } = require("sequelize");

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
  const data = req.body;

  try {
    for (const obj of data) {
      await TestDiagnoResponse.create({
        req_no: reqNo,
        service_center_id: obj.serviceCenterId,
        investigation: obj.investigation,
        cost: obj.cost,
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
    successResponse(200, "OK", reqNo, res);
  } catch (error) {
    errorResponse(
      500,
      "ERROR",
      error.message || "Some error occurred while Creeating Request",
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
