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

// get all blood-donation histories by userId (only collected)
exports.getAll = async (req, res) => {
  const userId = req.params.userId;

  try {
    const reqHistories = await BloodRequest.findAll({
      where: {
        accepted_donor: userId,
        status: 4,
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
    if (reqHistories) {
      successResponse(200, "OK", reqHistories, res);
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

exports.getAllRecieved = async (req, res) => {
  const { userId } = req.params;
  try {
    const reqHistories = await BloodRequest.findAll({
      where: {
        user_id: userId,
        status: 4,
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
    if (reqHistories) {
      successResponse(200, "OK", reqHistories, res);
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

exports.getAllCollected = async (req, res) => {
  const { serviceCenterId } = req.params;

  try {
    const reqHistories = await BloodRequest.findAll({
      where: {
        collection_point: serviceCenterId,
        status: 4,
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
    if (reqHistories) {
      successResponse(200, "OK", reqHistories, res);
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

exports.saveInvestigations = async (req, res) => {
  try {
    const bodyData = req.body;
    const currentDate = new Date();
    // console.log(bodyData);
    const donorId = bodyData.donorId;

    const find = await BloodRequest.findOne({
      where: {
        req_no: bodyData.reqNo,
        accepted_donor: bodyData.donorId,
      },
      include: [
        {
          model: User,
          as: "donor",
          attributes: ["id", "f_name", "mobile"],
        },
      ],
    });
    if (find) {
      const updated = await BloodRequest.update(
        {
          investigation_ids: bodyData.invsCsv,
          status: 4,
        },
        {
          where: {
            req_no: bodyData.reqNo,
            accepted_donor: bodyData.donorId,
          },
        },
      );
      const donateDateUpdate = await UserDetails.update(
        {
          last_blood_donate: currentDate,
        },
        {
          where: {
            user_id: donorId,
          },
        },
      );
      const message = `Thanks for your support. Please drink more water for recover your blood soon. Don't donate blood in next 3 months. Website: https://e-relatives.com`;
      const sentMessage = await axios.post(
        `https://api.greenweb.com.bd/api.php?token=${process.env.SMS_API_TOKEN}&to=${find?.donor?.mobile}&message=${message}`,
      );
      if (sentMessage) {
        successResponse(200, "OK", updated, res);
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
