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

exports.getAll = async (req, res) => {
  const { userId } = req.params;
  //   return res.json({ msg: "Route Ok.", userId });

  try {
    const myReqs = await BloodRequest.findAll({
      where: {
        user_id: userId,
      },
      include: [
        {
          model: User,
          as: "donor",
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
    if (myReqs) {
      successResponse(200, "OK", myReqs, res);
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

exports.getDonors = async (req, res) => {
  const reqId = req.params.reqId;
  const userId = req.params.userId;
  try {
    const reqWithDonors = await BloodRequest.findAll({
      where: {
        req_no: reqId,
        user_id: userId,
        accepted_donor: {
          [Op.ne]: null,
        },
      },
      include: [
        {
          model: User,
          as: "donor",
          attributes: ["id", "f_name", "mobile", "email", "image", "address_1"],
        },
      ],
    });
    console.log(reqWithDonors);
    if (reqWithDonors) {
      successResponse(200, "OK", reqWithDonors, res);
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
