const db = require("../../../config/database.config");
const RolePermission = db.model.rolePermission;
const Op = db.DataTypes.Op;
const AppError = require("../../../utils/appError.js");
const errorResponse = require("../../../utils/errorResponse");
const successResponse = require("../../../utils/successResponse");

exports.saveData = async (req, res) => {
  // console.log(data)
  try {
    const data = req.body.selectedActivites;
    const uniqueRoleIds = Array.from(
      new Set(data.map((activity) => activity.roleId))
    );

    for (const roleId of uniqueRoleIds) {
      await RolePermission.destroy({ where: { role_id: roleId } });
    }

    if (data.length === 0) {
      await RolePermission.bulkCreate(data);
      return res.status(200).json({ msg: "Role perm deleted successfully" });
    }

    for (const activity of data) {
      await RolePermission.create({
        role_id: activity.roleId,
        module_id: activity.moduleId,
        activity_id: activity.activityId,
      });
    }
    successResponse(200, "OK", data, res);
  } catch (error) {
    errorResponse(
      500,
      "ERROR",
      err.message || "Some error occurred while finding the post",
      res
    );
  }
};
exports.getData = (req, res) => {
  RolePermission.findAll()
    .then((data) => {
      console.log(data);
      successResponse(200, "OK", data, res);
    })
    .catch((err) => {
      errorResponse(
        500,
        "ERROR",
        err.message || "Some error occurred while finding the post",
        res
      );
    });
};
