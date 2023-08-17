const db = require("../../../../config/database.config");
const BloodRequest = db.model.bloodReq;
const User = db.model.user;
const errorResponse = require("../../../../utils/errorResponse");
const successResponse = require("../../../../utils/successResponse");
const { Op, where } = require("sequelize");

exports.getAll = async (req, res) => {
  const { collectionPoint } = req.params;
  console.log(collectionPoint);

  try {
    const data = await BloodRequest.findAll({
      where: {
        collection_point: collectionPoint,
        status: 1,
        accepted_donor: {
          [Op.not]: null,
        },
      },
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
    if(data) {
      successResponse(200, "OK", data, res);
    }
    
  } catch (err) {
    errorResponse(
      500,
      "ERROR",
      err.message || "Some error occurred while finding data",
      res
    );
  }
};

exports.editStatusByDonor = async (req, res) => {
  const { donor_id } = req.params;
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
          },
        }
      );
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
      res
    );
  }
};
