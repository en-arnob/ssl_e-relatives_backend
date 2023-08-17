const db = require("../../../../config/database.config");
const BloodRequest = db.model.bloodReq;
const User = db.model.user;
const UserDetails = db.model.UserDetails;
const City = db.model.city;
const State = db.model.state;
const Country = db.model.country;
const errorResponse = require("../../../../utils/errorResponse");
const successResponse = require("../../../../utils/successResponse");
const { Op } = require("sequelize");

// get all blood-donation histories by userId (only collected)
exports.getAll = async (req, res) => {
  const userId = req.params.userId;

  try {
    const reqHistories = await BloodRequest.findAll({
      where: {
        accepted_donor: userId,
        status: 2,
      },
      include: [
        {
          model: User,
          as: "req_by",
          attributes: ["id", "f_name", "mobile", "email", "image"],
        },
        {
          model: User,
          as: "col_point",
          attributes: [
            "id",
            "role_id",
            "f_name",
            "mobile",
            "email",
            "address_1",
          ],
          include: [
            {
              model: UserDetails,
              attributes: [
                "country_id",
                "city_id",
                "state_id",
                "owner_name",
                "responsible_person_name",
                "trade_license",
              ],
              include: [
                {
                  model: City,
                  attributes: ["id", "name"],
                },
                {
                  model: State,
                  attributes: ["id", "name"],
                },
                {
                  model: Country,
                  attributes: ["id", "name"],
                },
              ],
            },
          ],
        },
      ],
    });
    if (reqHistories) {
      successResponse(200, "OK", reqHistories, res);
    }
  } catch (err) {
    errorResponse(
      500,
      "ERROR",
      err.message || "Some error occurred while Finding data",
      res
    );
  }
};

exports.saveInvestigations = async (req, res) => {
  try {
    const bodyData = req.body;
    // console.log(bodyData);

    const find = await BloodRequest.findOne({
      where: {
        req_no: bodyData.reqNo,
        accepted_donor: bodyData.donorId,
      },
    });
    if (find) {
      const updated = await BloodRequest.update(
        {
          investigation_ids: bodyData.invsCsv,
        },
        {
          where: {
            req_no: bodyData.reqNo,
            accepted_donor: bodyData.donorId,
          },
        }
      );
      successResponse(200, "OK", updated, res);
    }
  } catch (err) {
    errorResponse(
      500,
      "ERROR",
      err.message || "Some error occurred while Finding data",
      res
    );
  }
};
