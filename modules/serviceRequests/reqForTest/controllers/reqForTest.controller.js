const db = require("../../../../config/database.config");
const errorResponse = require("../../../../utils/errorResponse");
const successResponse = require("../../../../utils/successResponse");
const Investigation = db.model.investigation;
const User = db.model.user;

exports.getAllName = async (req, res) => {
  try {
    const investigations = await Investigation.findAll({
      attributes: ["id", "name", "code", "detailed_name"],
    });
    successResponse(200, "SUCCESS", investigations, res);
  } catch (err) {
    errorResponse(
      500,
      "ERROR",
      err.message || "Some error occurred while finding data",
      res,
    );
  }
};

exports.getServiceCenters = async (req, res) => {
  try {
    // console.log("Hello");
    const serviceCenters = await User.findAll({
      attributes: [
        "id",
        "role_id",
        "service_category_id",
        "f_name",
        "address_1",
      ],
      where: {
        role_id: 13,
        service_category_id: 12,
      },
    });

    successResponse(200, "OK", serviceCenters, res);
  } catch (e) {
    errorResponse(
      500,
      "ERROR",
      e.message || "Some error occurred while finding data",
      res,
    );
  }
};
