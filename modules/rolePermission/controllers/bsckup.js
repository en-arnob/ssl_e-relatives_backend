const db = require("../../../config/database.config")
const RolePermission = db.model.rolePermission
const Op = db.DataTypes.Op
const AppError = require("../../../utils/appError.js");
const errorResponse = require("../../../utils/errorResponse");
const successResponse = require("../../../utils/successResponse");


exports.saveData = async (req, res) => {

    let data = req.body.selectedActivites
    // console.log(data)
    try {
        
        for (const activity of data) {
            await RolePermission.destroy({where: {role_id: activity.roleId}})
        }
    
        for (const activity of data) {
            await RolePermission.create({
                role_id: activity.roleId,
                module_id: activity.moduleId,
                activity_id: activity.activityId
            })
        }
        successResponse(200, "OK", data, res);
    } catch (error) {
        errorResponse(500, "ERROR", err.message || "Some error occurred while finding the post", res);
    }

    
}
exports.getData = (req, res) => {
    RolePermission.findAll()
    .then((data) => {
        console.log(data)
        successResponse(200, "OK", data, res);
    })
    .catch((err) => {
        errorResponse(500, "ERROR", err.message || "Some error occurred while finding the post", res);
    })
}