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

// exports.getAll = async (req, res) => {
//   const { userId } = req.params;
//   //   return res.json({ msg: "Route Ok.", userId });

//   try {
//     const myReqs = await BloodRequest.findAll({
//       where: {
//         reached_donor: userId,
//       },
//       include: [
//         {
//           model: User,
//           as: "req_by",
//           attributes: ["id", "f_name", "mobile", "email", "image"],
//         },
//         {
//           model: User,
//           as: "assigned_donor",
//           attributes: ["id", "f_name", "mobile", "email", "image"],
//         },
//         {
//           model: User,
//           as: "col_point",
//           attributes: [
//             "id",
//             "role_id",
//             "f_name",
//             "mobile",
//             "email",
//             "address_1",
//           ],
//           include: [
//             {
//               model: UserDetails,
//               attributes: [
//                 "country_id",
//                 "city_id",
//                 "state_id",
//                 "owner_name",
//                 "responsible_person_name",
//                 "trade_license",
//               ],
//               include: [
//                 {
//                   model: City,
//                   attributes: ["id", "name"],
//                 },
//                 {
//                   model: State,
//                   attributes: ["id", "name"],
//                 },
//                 {
//                   model: Country,
//                   attributes: ["id", "name"],
//                 },
//               ],
//             },
//           ],
//         },
//       ],
//     });
//     if (myReqs) {
//       successResponse(200, "OK", myReqs, res);
//     }
//   } catch (err) {
//     errorResponse(
//       500,
//       "ERROR",
//       err.message || "Some error occurred while Finding data",
//       res
//     );
//   }
// };

exports.getAll = async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await User.findOne({
      where: {
        id: userId,
      },
      include: [
        {
          model: UserDetails,
        },
      ],
    });

    const lastBloodDonateDate = new Date(user.user_detail.last_blood_donate);
    const currentDate = new Date();
    const timeDifference = currentDate - lastBloodDonateDate;
    const diffInMonths = timeDifference / (1000 * 60 * 60 * 24 * 30.44);
    if (diffInMonths >= 3) {
      const bloodRequests = await BloodRequest.findAll({
        where: {
          req_blood_group: user.user_detail.blood_group,

          [Op.or]: [{ accepted_donor: null }, { accepted_donor: userId }],
          user_id: {
            [Op.not]: userId,
          },
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
      const myCityId = user.user_detail.city_id;
      // console.log(myCityId);
      const cityFilteredBReqs = bloodRequests.filter(
        (item) => item.col_point.user_detail.city_id === myCityId
      );
      successResponse(200, "OK", cityFilteredBReqs, res);
      // successResponse(200, "OK", user, res);
    } else {
      res.json({ msg: "Last blood donation was less than 3 months ago." });
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

exports.accept = async (req, res) => {
  const reqId = req.params.id;
  const donorId = req.params.userId;
  try {
    const request = await BloodRequest.findByPk(reqId);
    if (request) {
      const updatedRequest = await BloodRequest.update(
        {
          status: 1,
          accepted_donor: donorId,
        },
        {
          where: {
            id: reqId,
          },
        }
      );
      successResponse(200, "OK", updatedRequest, res);
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
