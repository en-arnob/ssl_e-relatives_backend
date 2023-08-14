const db = require("../../../../config/database.config");
const errorResponse = require("../../../../utils/errorResponse");
const successResponse = require("../../../../utils/successResponse");
const Investigation = db.model.investigation;

exports.getAllName = async (req, res) => {
  try {
    const investigations = await Investigation.findAll({
      attributes: ["id", "name"],
    });
    successResponse(200, "SUCCESS", investigations, res);
  } catch (err) {
    errorResponse(
      500,
      "ERROR",
      err.message || "Some error occurred while finding data",
      res
    );
  }
};
