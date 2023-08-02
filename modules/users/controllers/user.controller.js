const db = require("../../../config/database.config");
const errorResponse = require("../../../utils/errorResponse");
const successResponse = require("../../../utils/successResponse");
var bcrypt = require("bcryptjs");

const Op = db.Sequelize.Op;
const User = db.model.user;
const UserDetails = db.model.UserDetails;
const Role = db.model.role;
const RolePermission = db.model.rolePermission;
const Country = db.model.country;
const State = db.model.state;
const City = db.model.city;

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
    // console.log(dateRange);

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

exports.updateUser = async (req, res) => {
  try {
    // res.json({ msg: "URL" });
    const userId = req.params.id;
    const userData = req.body;

    const query = await UserDetails.findOne({
      where: {
        user_id: userId,
      },
    });
    if (query) {
      const update = {
        gender_id: userData.gender,
        country_id: userData.country,
        state_id: userData.state,
        city_id: userData.city,
        blood_group: userData.bloodGroup,
        owner_name: userData.ownerName,
        institution_name: userData.institutionName,
        responsible_person_name: userData.responsiblePName,
        designation: userData.designation,
        vehicle_license: userData.vehicleLicense,
        trade_license: userData.tradeLicense,
        bmdc_license: userData.bmdcLicense,
        dghs_license: userData.dghsLicense,
        drug_license: userData.drugLicense,
        online_service_time: userData.onlineServiceTime,
        available_service: userData.availableService,
        delivery_person_name: userData.deliveryPName,
        driver_name: userData.driverName,
        driving_license: userData.drivingLicense,
        specialization_degree: userData.specializationDegree,
        driving_exp_years: userData.drivingExpYears,
      };
      if (userData.image) {
        update.image = userData.image;
      }
      const data = await UserDetails.update(update, {
        where: {
          user_id: userId,
        },
      });
      const user = await User.findByPk(userId);
      if (user) {
        const restofthefieldsUpdate = await User.update(
          {
            date_of_birth: userData.dob,
            address_1: userData.address,
            nid: userData.nid,
            image: userData.image,
            user_details_added: 1,
          },
          {
            where: {
              id: userId,
            },
          }
        );
        res.status(200).send({
          status: "success",
          message: "User updated successfully",
          data: data,
        });
      }
    } else {
      res.status(404).send({
        message: `Cannot find User with id=${userId}.`,
      });
    }
  } catch (err) {
    errorResponse(
      500,
      "ERROR",
      err.message ||
        "Some error occurred while Finding Users By Date_of_Birth.",
      res
    );
  }
};

exports.getDetails = async (req, res) => {
  try {
    const id = req.params.id;

    const userQuery = await UserDetails.findOne({
      where: {
        user_id: id,
      },
      include: [
        {
          model: Country,
          // attributes: ["name", "info"],
        },
        {
          model: State,
          // attributes: ["name", "info"],
        },
        {
          model: City,
          // attributes: ["name", "info"],
        },
      ],
    });

    if (userQuery) {
      res.status(200).send({
        status: "1",
        message: `Found User with id=${id} Successfully!!`,
        data: userQuery,
      });
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
