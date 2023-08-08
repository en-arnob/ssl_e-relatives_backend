const db = require("../../../../config/database.config");
const BloodRequest = db.model.bloodReq;
const User = db.model.user;
const UserDetails = db.model.UserDetails;
const City = db.model.city;
const State = db.model.state;
const Country = db.model.country;
const errorResponse = require("../../../../utils/errorResponse");
const successResponse = require("../../../../utils/successResponse");

exports.getAll = async (req, res) => {
  const { userId } = req.params;
  //   return res.json({ msg: "Route Ok.", userId });

  try {
    const myReqs = await BloodRequest.findAll({
      where: {
        reached_donor: userId,
      },
      include: [
        {
          model: User,
          as: "assigned_donor",
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
