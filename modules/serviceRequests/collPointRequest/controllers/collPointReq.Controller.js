const db = require("../../../../config/database.config");
const BloodRequest = db.model.bloodReq;
const User = db.model.user;
const UserDetails = db.model.UserDetails;
const errorResponse = require("../../../../utils/errorResponse");
const successResponse = require("../../../../utils/successResponse");
const { Op, where } = require("sequelize");

exports.getAll = async (req, res) => {
  const { collectionPoint } = req.params;
  // console.log(collectionPoint);

  try {
    const data = await BloodRequest.findAll({
      where: {
        collection_point: collectionPoint,
        [Op.or]: [{ status: 1 }, { status: 2 }],
        accepted_donor: {
          [Op.not]: null,
        },
        investigation_ids: null,
      },
      order: [["id", "DESC"]],
      include: [
        {
          model: User,
          as: "req_by",
          attributes: ["f_name"],
        },
        {
          model: User,
          as: "donor",
          attributes: ["f_name"],
        },
      ],
    });

    // if (data.length === 0) {
    //   return errorResponse(404, "NOT_FOUND", "No data found", res);
    // }
    if (data) {
      successResponse(200, "OK", data, res);
    }
  } catch (err) {
    errorResponse(
      500,
      "ERROR",
      err.message || "Some error occurred while finding data ",
      res,
    );
  }
};

exports.editStatusByDonor = async (req, res) => {
  const { donor_id } = req.params;
  const body = req.body;
  // console.log(body);
  const currentDate = new Date();
  try {
    const data = await User.findOne({
      where: {
        id: donor_id,
      },
    });
    if (data) {
      const updateData = await BloodRequest.update(
        {
          status: 2,
        },
        {
          where: {
            accepted_donor: donor_id,
            req_no: body.req_no,
          },
        },
      );
      // const donateDateUpdate = await UserDetails.update(
      //   {
      //     last_blood_donate: currentDate,
      //   },
      //   {
      //     where: {
      //       user_id: donor_id,
      //     },
      //   },
      // );
      if (updateData[0] === 0) {
        return errorResponse(404, "NOT_FOUND", "No data found", res);
      }
      successResponse(200, "OK", updateData, res);
    }
  } catch (err) {
    errorResponse(
      500,
      "ERROR",
      err.message || "Some error occurred while finding data",
      res,
    );
  }
};
