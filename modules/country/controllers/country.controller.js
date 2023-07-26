const db = require("../../../config/database.config");
const Country = db.model.country;
const Op = db.DataTypes.Op;

const AppError = require("../../../utils/appError.js");
const errorResponse = require("../../../utils/errorResponse");
const successResponse = require("../../../utils/successResponse");

exports.create = (req, res) => {
  // console.log(req.body);
  // Validate request data
  if (!req.body.name && !req.body.phonecode) {
    errorResponse(400, "FAILED", "Content cannot be displayed", res);
  }

  const data = {
    name: req.body.name,
    nationality: req.body.nationality,
    shortname: req.body.shortname,
    phonecode: req.body.phonecode,
    status: parseInt(req.body.status),
  };

  // console.log(data);
  // call model function for inserting data in database
  Country.create(data)
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
  Country.findAll()
    .then((data) => {
      successResponse(200, "OK", data, res);
    })
    .catch((err) => {
      errorResponse(
        500,
        "ERROR",
        err.message || "Some error occurred while finding the Country",
        res
      );
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Country.findOne({ where: { id: id } })
    .then((data) => {
      if (data) {
        res.status(200).send({
          status: "success",
          message: "Country data",
          data: data,
        });
      } else {
        res.status(404).send({
          message: `Cannot find Country with id ${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error retrieving Country with id = ${id}`,
      });
    });
};

exports.update = (req, res) => {
  // console.log(req.body);
  const id = req.params.id;
  const find = Country.findOne({ where: { id: id } });
  const data = {
    name: req.body.name,
    nationality: req.body.nationality,
    shortname: req.body.shortname,
    phonecode: req.body.phonecode,
    status: parseInt(req.body.status),
  };

  if (find) {
    Country.update(data, { where: { id: id } })
      .then((data) => {
        res.status(200).send({
          message: `Successfully updated Country ${data}`,
        });
      })
      .catch((err) => {
        res.status(404).send({
          message: `Failed to update Country with id = ${id}`,
        });
      });
  } else {
    errorResponse(404, "FAILED", "Country not found", res);
  }
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Country.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Country was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Country with id=${id}. Maybe Country was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Country with id=" + id,
      });
    });
};

exports.deleteAll = (req, res) => {
  Country.destroy({ where: {}, truncate: false })
    .then((data) => {
      res.status(200).send(`${data} Country deleted successfully`);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while deleting all Country",
      });
    });
};
