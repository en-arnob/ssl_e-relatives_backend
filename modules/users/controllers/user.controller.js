const db = require("../../../config/database.config");
const errorResponse = require("../../../utils/errorResponse");
const successResponse = require("../../../utils/successResponse");
var bcrypt = require("bcryptjs");

const Op = db.Sequelize.Op;
const User = db.model.user;
const Role = db.model.role;
const RolePermission = db.model.rolePermission;

exports.findAll = async (req, res) => {
  try {
    const data = await User.findAll({
      include: [
        {
          model: Role,
          attributes: ["name", "info"],
        },
      ],
    });

    if (data.length > 0) {
      successResponse(200, "OK", data, res);
    } else {
      res.send({ message: "No User Found!" });
    }
  } catch (err) {
    errorResponse(
      500,
      "ERROR",
      err.message || "Some error occurred while Finding User",
      res
    );
  }
};

exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;

    const userQuery = await User.findOne({
      where: {
        id: id,
      },
      include: [
        {
          model: Role,
          attributes: ["name", "info"],
        },
      ],
    });

    if (userQuery) {
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
        res.status(200).send({
          status: "1",
          message: `Found User with id=${id} Successfully!!`,
          data: userQueryData,
        });
      }
    } else {
      res.status(404).send({
        message: `Cannot find User with id=${id}.`,
      });
    }
  } catch (err) {
    errorResponse(
      500,
      "ERROR",
      err.message || "Some error occurred while Finding User",
      res
    );
  }
};

exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const userData = req.body;
    console.log(userData);

    const query = await User.findByPk(id);

    if (query) {
      if (userData?.f_name && userData?.role_id && userData?.mobile) {
        const updateDoc = {
          role_id: userData.role_id,
          f_name: userData.f_name,
          l_name: userData.l_name,
          mobile: userData.mobile,
          email: userData.email,
          date_of_birth: userData.date_of_birth,
          contact_person: userData.contactPerson,
          nid: userData.nid,
          address_1: userData.address1,
          address_2: userData.address2,
          remarks: userData.remarks,
          status: userData.status,
        };
        if (userData.image) {
          updateDoc.image = userData.image;
        }
        if (userData.finger_print) {
          updateDoc.finger_print = userData.finger_print;
        }

        const data = await User.update(updateDoc, {
          where: {
            id: id,
          },
        });
        res.status(200).send({
          status: "success",
          message: "User updated successfully",
          data: data,
        });
      } else {
        res.send({
          status: "error",
          message: "Required Fields Cannot be Empty!!!",
        });
      }
    } else {
      res.status(404).send({
        message: `Cannot find User with id=${req.params.id}.`,
      });
    }
  } catch (err) {
    errorResponse(
      500,
      "ERROR",
      err.message || "Some error occurred while Updating User",
      res
    );
  }
};

exports.delete = async (req, res) => {
  try {
    const id = req.params.id;

    const query = await User.findByPk(id);
    if (query) {
      const result = await User.destroy({
        where: {
          id: id,
        },
      });

      res.send({ data: result, message: "User deleted Successfully!" });
    } else {
      res.send({
        message: `Cannot delete User with id=${id}. Maybe User was not found!`,
      });
    }
  } catch (err) {
    errorHandler(
      500,
      "ERROR",
      err.message || "Some error occurred while Deleting the User.",
      res
    );
  }
};

exports.findAllByBirthdayRange = async (req, res) => {
  try {
    const dateRange = req.body;
    console.log(dateRange);

    const options = { month: "2-digit", day: "2-digit" };
    const startDate = new Date(dateRange.startDate);
    const startDateFormate = startDate.toLocaleDateString("en-US", options);
    const sqlStartDate = startDateFormate.replace("/", "-");

    const endDate = new Date(dateRange.endDate);
    const endDateFormate = endDate.toLocaleDateString("en-US", options);
    const sqlEndDate = endDateFormate.replace("/", "-");

    const targetRole = dateRange.role_id;

    console.log({
      sqlStartDate,
      sqlEndDate,
      targetRole,
    });

    if (targetRole) {
      // const likeStartDate = { [Op.like]: `%${sqlStartDate}` };
      // const likeEndDate = { [Op.like]: `%${sqlEndDate}` };

      const data = await User.findAll({
        where: {
          // role_id: targetRole,
          date_of_birth: {
            // [Op.between]: ['2014-06-18', '2023-10-19'],
            // [Op.like]: `${`2014-06-18`}`,
            [Op.like]: `${sqlStartDate}`,
          },
        },
      });

      successResponse(200, "OK", data, res);
    } else {
      const data = await User.findAll({
        where: {
          id: {
            [Op.between]: [30, 27],
          },
        },
      });

      successResponse(200, "OK", data, res);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.uploadImage = async (req, res) => {
  try {
    let imageFiles = req.file;

    // console.log(image);

    res.send(imageFiles);
  } catch (err) {
    errorHandler(
      500,
      "ERROR",
      err.message ||
        "Some error occurred while Finding Users By Date_of_Birth.",
      res
    );
  }
};
