const db = require("../../../config/database.config");
const InvestigationGoup = db.model.investigationGroup;
const Op = db.DataTypes.Op;

const AppError = require("../../../utils/appError.js");
const errorResponse = require("../../../utils/errorResponse");
const successResponse = require("../../../utils/successResponse");

exports.create = (req, res) => {
  //   console.log(req.body);
  // Validate request data
  if (!req.body.name) {
    errorResponse(400, "FAILED", "Content cannot be displayed", res);
  }

  const data = {
    name: req.body.name,
    info: req.body.info,
    status: parseInt(req.body.status),
  };

  //   console.log(data);
  // call model function for inserting data in database
  InvestigationGoup.create(data)
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

exports.getAll = (req, res) => {
  InvestigationGoup.findAll()
    .then((data) => {
      successResponse(200, "OK", data, res);
    })
    .catch((err) => {
      errorResponse(
        500,
        "ERROR",
        err.message ||
          "Some error occurred while finding the InvestigationGoups",
        res
      );
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  InvestigationGoup.findOne({ where: { id: id } })
    .then((data) => {
      if (data) {
        res.status(200).send({
          status: "success",
          message: "InvestigationGoup data",
          data: data,
        });
      } else {
        res.status(404).send({
          message: `Cannot find InvestigationGoup with id ${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error retrieving InvestigationGoup with id = ${id}`,
      });
    });
};

exports.update = (req, res) => {
  // console.log(req.body);
  const id = req.params.id;
  const find = InvestigationGoup.findOne({ where: { id: id } });
  const data = {
    name: req.body.name,
    info: req.body.info,
    status: parseInt(req.body.status),
    // status: req.body.status,
    // created_by: req.body.created_by,
    // updated_by: req.body.updated_by
  };

  if (find) {
    InvestigationGoup.update(data, { where: { id: id } })
      .then((data) => {
        res.status(200).send({
          message: `Successfully updated InvestigationGoup ${data}`,
        });
      })
      .catch((err) => {
        res.status(404).send({
          message: `Failed to update InvestigationGoup with id = ${id}`,
        });
      });
  } else {
    errorResponse(404, "FAILED", "InvestigationGoup not found", res);
  }
};

exports.delete = (req, res) => {
  const id = req.params.id;

  InvestigationGoup.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "InvestigationGoup was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete InvestigationGoup with id=${id}. Maybe InvestigationGoup was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete InvestigationGoup with id=" + id,
      });
    });
};

exports.deleteAll = (req, res) => {
  InvestigationGoup.destroy({ where: {}, truncate: false })
    .then((data) => {
      res.status(200).send(`${data} InvestigationGoup deleted successfully`);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while deleting all InvestigationGoup",
      });
    });
};
