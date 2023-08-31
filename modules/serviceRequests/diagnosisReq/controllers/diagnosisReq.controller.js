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
      res
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
      }
    );
    successResponse(200, "OK", reqNo, res);
  } catch (error) {
    errorResponse(
      500,
      "ERROR",
      error.message || "Some error occurred while Creeating Request",
      res
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
      res
    );
  }
};
