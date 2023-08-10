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

exports.getAll = async (req, res) => {
  const { collectionPoint } = req.params;
  console.log(collectionPoint);

  try {
    const data = await BloodRequest.findAll({
      where: {
        collection_point: collectionPoint,
        accepted_donor: {
          [Op.not]: null,
        },
      },
    });

    if (data.length === 0) {
      return errorResponse(404, "NOT_FOUND", "No data found", res);
    }

    // Extract user_ids and accepted_donor values from the data
    const userIds = data.map(item => item.user_id);
    const donorIds = data.map(item => item.accepted_donor);

    // Fetch user details for user_ids and accepted_donor values
    const users = await User.findAll({
      where: {
        [Op.or]: [
          { id: userIds },
          { id: donorIds }
        ]
      },
      attributes: ['id', 'f_name'] // Fetch only id and f_name fields
    });

    // Organize the user details into an object for easier lookup
    const userMap = {};
    users.forEach(user => {
      userMap[user.id] = user;
    });

    // Combine the original data with user details
    const enrichedData = data.map(item => {
      return {
        ...item.get(),
        donorBy: { f_name: userMap[item.user_id].f_name },
        requestedBy: { f_name: userMap[item.accepted_donor].f_name }
      };
    });

    successResponse(200, "OK", enrichedData, res);
  } catch (err) {
    errorResponse(
      500,
      "ERROR",
      err.message || "Some error occurred while finding data",
      res
    );
  }
};
