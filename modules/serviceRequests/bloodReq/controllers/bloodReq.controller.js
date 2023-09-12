require("dotenv").config();
const db = require("../../../../config/database.config");
const axios = require("axios");
const BloodRequest = db.model.bloodReq;
const UserDetails = db.model.UserDetails;
const User = db.model.user;
const City = db.model.city;
const State = db.model.state;
const Country = db.model.country;
const errorResponse = require("../../../../utils/errorResponse");
const successResponse = require("../../../../utils/successResponse");
const dateFormatter = require("../../../../helpers/dateFormatter");

const { Op } = require("sequelize");

const threeMonthsAgo = new Date();
threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

exports.create = async (req, res) => {
  //   res.json({ msg: "API Route Working" });
  const bloodReqData = req.body;

  try {
    const bloodReqNo = Math.floor(
      1000000000 +
        Math.random() *
          9000000000 *
          Math.floor(1000000000 + Math.random() * 9000000000 * Date.now()),
    )
      .toString()
      .substring(2, 10);
    const dateOnly = new Date(bloodReqData.dateTime)
      .toISOString()
      .split("T")[0];
    const compDate = new Date(dateOnly);
    compDate.setMonth(compDate.getMonth() - 3);
    // const threeMonthsAgo = dateOnly;
    // threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

    // res.json({ msg: "Ok created" });
    // get collectionPoint Data
    let colPoint = await User.findOne({
      where: {
        role_id: 13,
        id: bloodReqData.collectionPoint,
      },
      attributes: [
        "id",
        "role_id",
        "service_category_id",
        "f_name",
        "username",
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
          ],
        },
      ],
    });
    let cityId = colPoint?.user_detail?.city?.id;
    let matchedDonors = await UserDetails.findAll({
      where: {
        blood_group: bloodReqData.bg,
        last_blood_donate: {
          [Op.lt]: compDate,
        },
        user_id: {
          [Op.not]: bloodReqData.userId,
        },
        city_id: cityId,
      },
      attributes: [
        "user_id",
        "gender_id",
        "country_id",
        "state_id",
        "city_id",
        "blood_group",
        "last_blood_donate",
      ],
      include: [
        {
          model: User,
          where: {
            role_id: 10,
          },
          attributes: [
            "role_id",
            "f_name",
            "username",
            "date_of_birth",
            "mobile",
            "email",
            "address_1",
          ],
        },
      ],
    });

    for (let i = 0; i < bloodReqData.bags; i++) {
      await BloodRequest.create({
        user_id: bloodReqData.userId,
        req_no: bloodReqNo,
        req_blood_group: bloodReqData.bg,
        date_time: bloodReqData.dateTime,
        time: bloodReqData.time,
        collection_point: bloodReqData.collectionPoint,
      });
    }

    const message = `Dear, Someone requested for ${
      parseInt(bloodReqData.bg) === 1
        ? "(A Positive)"
        : parseInt(bloodReqData.bg) === 2
        ? "(A Negative) "
        : parseInt(bloodReqData.bg) === 3
        ? "(B Positive)"
        : parseInt(bloodReqData.bg) === 4
        ? "(B Negative)"
        : parseInt(bloodReqData.bg) === 5
        ? "(O Positive)"
        : parseInt(bloodReqData.bg) === 6
        ? "(O Negative)"
        : parseInt(bloodReqData.bg) === 7
        ? "(AB Positive)"
        : parseInt(bloodReqData.bg) === 8
        ? "(AB Negative)"
        : ""
    } Blood at ${colPoint?.f_name} , ${
      colPoint?.address_1
    } for ${dateFormatter.formatDate(dateOnly)} , ${
      bloodReqData?.time
    } . Website: https://e-relatives.com`;
    console.log(message);

    if (matchedDonors) {
      await matchedDonors.forEach((donor) => {
        // console.log(donor);
        axios
          .post(
            `https://api.greenweb.com.bd/api.php?token=${process.env.SMS_API_TOKEN}&to=${donor.user.mobile}&message=${message}`,
          )
          .then(() => {
            console.log(`Sent to ${donor.mobile}`);
          })
          .catch((error) => {
            console.log("error");
          });
      });
    }
    return res.json({
      msg: "Request created",
      donors: matchedDonors,
      dateOnly,
    });
  } catch (err) {
    errorResponse(
      500,
      "ERROR",
      err.message || "Some error occurred while Finding User",
      res,
    );
  }
};

exports.getColPoints = async (req, res) => {
  try {
    const collectionPoints = await User.findAll({
      where: {
        role_id: 13,
      },
      attributes: ["id", "role_id", "f_name", "mobile", "email", "address_1"],
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
    });
    successResponse(200, "OK", collectionPoints, res);
  } catch (err) {
    errorResponse(
      500,
      "ERROR",
      err.message || "Some error occurred while Finding User",
      res,
    );
  }
};
