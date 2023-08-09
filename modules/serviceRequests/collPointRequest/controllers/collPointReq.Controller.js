const db = require("../../../../config/database.config");
const BloodRequest = db.model.bloodReq;
const errorResponse = require("../../../../utils/errorResponse");
const successResponse = require("../../../../utils/successResponse");

exports.getAll = async (req, res) => {
  const { collectionPoint } = req.params;
  
  try {
    const data = await BloodRequest.findAll({
      where: {
        collection_point: 59,
      },
    });

    if (data.length === 0) {
      return errorResponse(404, "NOT_FOUND", "No data found", res);
    }

    successResponse(200, "OK", data, res);
  } catch (err) {
    errorResponse(
      500,
      "ERROR",
      err.message || "Some error occurred while finding data",
      res
    );
  }
};
