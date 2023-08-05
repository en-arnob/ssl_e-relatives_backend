require("dotenv").config();
const db = require("../../../config/database.config");
const errorResponse = require("../../../utils/errorResponse");
const successResponse = require("../../../utils/successResponse");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

const User = db.model.user;
const Role = db.model.role;
const RolePermission = db.model.rolePermission;

exports.signin = async (req, res) => {
  try {
    const userData = req.body;
    // console.log(userData);

    if (!userData) {
      return errorResponse(400, "FAILED", "Content can not be empty!", res);
    } else {
      const userQuery = await User.findOne({
        // where: { mobile: userData.mobile, otp_verified: 1 },
        where: { mobile: userData.mobile },
        include: [
          {
            model: Role,
            attributes: ["name", "info"],
          },
        ],
      });
      if (!userQuery) {
        return res.status(404).send({
          status: "0",
          message: "User Mobile Number or Password is Invalid",
          data: [],
        });
      } else {
        // console.log(userQuery.otp_verified);

        var passwordIsValid = bcrypt.compareSync(
          userData.password,
          userQuery.password
        );

        if (!passwordIsValid) {
          return res.status(401).send({
            accessToken: null,
            message: "User Mobile Number or Password is Invalid",
          });
        }

        const rolePermissionsQuery = await RolePermission.findAll({
          where: {
            role_id: userQuery.role_id,
          },
          attributes: ["module_id", "activity_id"],
        });

        if (rolePermissionsQuery) {
          const userQueryData = {
            userQuery,
            permissions: rolePermissionsQuery,
          };

          var token = jwt.sign({ id: userQuery.id }, process.env.JWT_SECRET, {
            expiresIn: 86400, // 24 hours
          });

          res.status(200).send({
            status: "1",
            message: "You are Successfully Logged in",
            token: token,
            data: userQueryData,
          });
        }
      }
    }
  } catch (err) {
    errorResponse(
      500,
      "ERROR",
      err.message || "Some error occurred while creating the User.",
      res
    );
  }
};
