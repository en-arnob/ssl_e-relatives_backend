const db = require("../../../config/database.config");
const Marital = db.model.merital;
const Op = db.DataTypes.Op;

const AppError = require("../../../utils/appError.js");
const errorResponse = require("../../../utils/errorResponse");
const successResponse = require("../../../utils/successResponse");

exports.create = (req, res) => {
  console.log(req.body);
  // Validate request data
  if (!req.body.name && !req.body.info) {
    errorResponse(400, "FAILED", "Content cannot be displayed", res);
  }

  const data = {
    name: req.body.name,
    info: req.body.info,
    status: parseInt(req.body.status),
  };

  // console.log(data);
  // call model function for inserting data in database
  Marital.create(data)
    .then((data) => {
      // console.log(data.toJSON());

      successResponse(201, "OK", data, res);
    })
    .catch((err) => {
      errorResponse(
        500,
        "ERROR",
        err.message || "Failed to Register, Please try Again!",
        res
      );
    });
};

exports.findAll = (req, res) => {
  Marital.findAll()
    .then((data) => {
      successResponse(200, "OK", data, res);
    })
    .catch((err) => {
      errorResponse(
        500,
        "ERROR",
        err.message || "Some error occurred while finding the Marital Status's",
        res
      );
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Marital.findOne({ where: { id: id } })
    .then((data) => {
      if (data) {
        res.status(200).send({
          status: "success",
          message: "Marital data",
          data: data,
        });
      } else {
        res.status(404).send({
          message: `Cannot find Marital with id ${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error retrieving Marital with id = ${id}`,
      });
    });
};

exports.update = (req, res) => {
  // console.log(req.body);
  const id = req.params.id;
  const find = Marital.findOne({ where: { id: id } });
  const data = {
    name: req.body.name,
    info: req.body.info,
    status: parseInt(req.body.status),
    // status: req.body.status,
    // created_by: req.body.created_by,
    // updated_by: req.body.updated_by
  };

  if (find) {
    Marital.update(data, { where: { id: id } })
      .then((data) => {
        res.status(200).send({
          message: `Successfully updated Marital ${data}`,
        });
      })
      .catch((err) => {
        res.status(404).send({
          message: `Failed to update Marital with id = ${id}`,
        });
      });
  } else {
    errorResponse(404, "FAILED", "Marital not found", res);
  }
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Marital.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Marital was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Marital with id=${id}. Maybe Marital was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Marital with id=" + id,
      });
    });
};

exports.deleteAll = (req, res) => {
  Marital.destroy({ where: {}, truncate: false })
    .then((data) => {
      res.status(200).send(`${data} Maritals deleted successfully`);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while deleting all Maritals",
      });
    });
};
