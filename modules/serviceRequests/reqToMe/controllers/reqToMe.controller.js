require("dotenv").config();
const db = require("../../../../config/database.config");
const axios = require("axios");
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
    if (user.user_detail.last_blood_donate === "0000-00-00") {
      const bloodRequests = await BloodRequest.findAll({
        where: {
          req_blood_group: user.user_detail.blood_group,

          [Op.or]: [{ accepted_donor: null }, { accepted_donor: userId }],
          user_id: {
            [Op.not]: userId,
          },
        },
        order: [["id", "DESC"]],
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
        (item) => item.col_point.user_detail.city_id === myCityId,
      );
      successResponse(200, "OK", cityFilteredBReqs, res);
    } else {
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
          order: [["id", "DESC"]],

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
          (item) => item.col_point.user_detail.city_id === myCityId,
        );
        successResponse(200, "OK", cityFilteredBReqs, res);
        // successResponse(200, "OK", user, res);
      } else {
        res.json({ msg: "Last blood donation was less than 3 months ago." });
      }
    }
  } catch (err) {
    errorResponse(
      500,
      "ERROR",
      err.message || "Some error occurred while Finding data",
      res,
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
        },
      );
      const acceptedReqData = await BloodRequest.findByPk(reqId, {
        include: [
          {
            model: User,
            as: "req_by",
            attributes: ["id", "f_name", "mobile", "email", "image"],
          },
          {
            model: User,
            as: "donor",
            attributes: ["id", "f_name", "mobile", "email", "image"],
          },
          {
            model: User,
            as: "col_point",
            attributes: ["id", "f_name", "mobile", "email", "image"],
          },
        ],
      });

      const message1 = `Your Blood Request No. is ${acceptedReqData?.req_no} and Donor is Mr/Mrs ${acceptedReqData?.donor?.f_name}, Cell No. ${acceptedReqData?.donor?.mobile} . Please schedule with him/her for the donation`;
      const sentMessage1 = await axios.post(
        `https://api.greenweb.com.bd/api.php?token=${process.env.SMS_API_TOKEN}&to=${acceptedReqData?.req_by?.mobile}&message=${message1}`,
      );
      if (sentMessage1) {
        const message2 = `Please remember: The donor is helping you to save life. Please entertain him/her with some drinks and be conscious about his/her transport cost.`;

        const sentMessage2 = await axios.post(
          `https://api.greenweb.com.bd/api.php?token=${process.env.SMS_API_TOKEN}&to=${acceptedReqData?.req_by?.mobile}&message=${message2}`,
        );
        // console.log(request);
      }
      const message3 = `Your Donation No. is ${acceptedReqData?.req_no}, You are helping to save someone's life. You are a real hero. Please don't demand any kind of benefit from the receiver`;
      const sentMessage3 = await axios.post(
        `https://api.greenweb.com.bd/api.php?token=${process.env.SMS_API_TOKEN}&to=${acceptedReqData?.donor?.mobile}&message=${message3}`,
      );
      if (sentMessage3) {
        const message4 = `Mr/Mrs. ${acceptedReqData?.req_by?.f_name} made a schedule to collect blood from Mr/Mrs. ${acceptedReqData?.donor?.f_name}. The Donation No. is ${acceptedReqData?.req_no}. Please co-operate them.`;
        const sentMessage4 = await axios.post(
          `https://api.greenweb.com.bd/api.php?token=${process.env.SMS_API_TOKEN}&to=${acceptedReqData?.col_point?.mobile}&message=${message4}`,
        );
        if (sentMessage4) {
          successResponse(200, "OK", acceptedReqData, res);
        }
      }
    }
  } catch (err) {
    errorResponse(
      500,
      "ERROR",
      err.message || "Some error occurred while Finding data",
      res,
    );
  }
};
