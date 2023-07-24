const errorHandler = require("../../../utils/errorHandler");
const errorResponse = require("../../../utils/errorResponse");
const successResponse = require("../../../utils/successResponse");
const db = require("../../../config/database.config");

const Role = db.model.role;

exports.create = async (req, res) => {
  try {
    const roleData = req.body;
    console.log(roleData);

    if (!roleData) {
      errorResponse(400, "FAILED", "Content can not be empty!", res);
    } else {
      const dataObj = {
        name: roleData.name,
        info: roleData.info,
        priority: roleData.priority,
        status: roleData.status,
      };

      const data = await Role.create(dataObj);
      successResponse(201, "OK", data, res);
    }
  } catch (err) {
    errorResponse(
      500,
      "ERROR",
      err.message || "Some error occurred while creating the User Role.",
      res
    );
  }
};

exports.findAll = async (req, res) => {
  try {
    const query = await Role.findAll();
    if (query.length > 0) {
      successResponse(200, "OK", query, res);
    } else {
      res.send({ message: "No Role Found!" });
    }
  } catch (err) {
    errorResponse(
      500,
      "ERROR",
      err.message || "Some error occurred while finding Users Role.",
      res
    );
  }
};

exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);

    const data = await Role.findByPk(id);

    if (data) {
      res.status(200).send({
        status: "success",
        message: "single Role data",
        data: data,
      });
    } else {
      res.status(404).send({
        message: `Cannot find Role with id=${id}.`,
      });
    }
  } catch (err) {
    errorResponse(
      500,
      "ERROR",
      err.message || "Some error occurred while creating the Post.",
      res
    );
  }
};

exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const rolesData = req.body;

    const query = await Role.findByPk(id);

    if (query) {
      if (rolesData?.name) {
        const updateDoc = {
          name: rolesData.name,
          info: rolesData.info,
          priority: rolesData.priority,
          status: rolesData.status,
        };
        const data = await Role.update(updateDoc, {
          where: {
            id: id,
          },
        });
        res.status(200).send({
          status: "success",
          message: "Role updated successfully",
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
        message: `Cannot find Role with id=${req.params.id}.`,
      });
    }
  } catch (err) {
    errorResponse(
      500,
      "ERROR",
      err.message || "Some error occurred while Updateing the User Role.",
      res
    );
  }
};

exports.delete = async (req, res) => {
  try {
    const id = req.params.id;

    const query = await Role.findByPk(id);
    if (query) {
      const result = await Role.destroy({
        where: {
          id: id,
        },
      });

      if (result === 1) {
        res.send({ data: result, message: "Role deleted Successfully!" });
      }
    } else {
      res.send({
        message: `Cannot delete Role with id=${id}. Maybe Role was not found!`,
      });
    }
  } catch (err) {
    errorHandler(
      500,
      "ERROR",
      err.message || "Some error occurred while Deleting User Role.",
      res
    );
  }
};

exports.findByPriority = async (req, res) => {
  const prior = req.params.priority;
  try {
    const query = await Role.findAll({
      where: {
        priority: prior,
      },
    });
    if (query.length > 0) {
      successResponse(200, "OK", query, res);
    } else {
      res.send({ message: "No Role Found!" });
    }
  } catch (err) {
    errorResponse(
      500,
      "ERROR",
      err.message || "Some error occurred while finding Users Role.",
      res
    );
  }
};
