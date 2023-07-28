const db = require("../../../config/database.config");
const Instrument = db.model.instrument;
const UOM = db.model.uom;
const CAT = db.model.instrumentCategory;
const Op = db.DataTypes.Op;

const AppError = require("../../../utils/appError.js");
const errorResponse = require("../../../utils/errorResponse");
const successResponse = require("../../../utils/successResponse");

exports.create = (req, res) => {
  // console.log(req.body);
  // Validate request data
  if (!req.body.name && !req.body.info) {
    errorResponse(400, "FAILED", "Content cannot be displayed", res);
  }

  const data = {
    name: req.body.name,
    unit_id: req.body.unit_id,
    cat_id: req.body.cat_id,
    info: req.body.info,
    status: parseInt(req.body.status),
    // status: req.body.status,
    // created_by: req.body.created_by,
    // updated_by: req.body.updated_by
  };

  // console.log(data);
  // call model function for inserting data in database
  Instrument.create(data)
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

exports.getUnitId = (req, res) => {
  UOM.findAll({ attributes: ["name", "id"] })
    .then((data) => {
      successResponse(200, "OK", data, res);
    })
    .catch((err) => {
      errorResponse(
        500,
        "ERROR",
        err.message || "Some error occurred while finding the Units",
        res
      );
    });
};
exports.getCatId = (req, res) => {
  CAT.findAll({ attributes: ["name", "id"] })
    .then((data) => {
      successResponse(200, "OK", data, res);
    })
    .catch((err) => {
      errorResponse(
        500,
        "ERROR",
        err.message || "Some error occurred while finding the Units",
        res
      );
    });
};

exports.findAll = (req, res) => {
  Instrument.findAll({
    include: [
      {
        model: UOM,
        attributes: ["name", "id"],
      },
      { model: CAT, attributes: ["name", "id"] },
    ],
  })
    .then((data) => {
      successResponse(200, "OK", data, res);
    })
    .catch((err) => {
      errorResponse(
        500,
        "ERROR",
        err.message || "Some error occurred while finding the Instruments",
        res
      );
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Instrument.findOne({ where: { id: id } })
    .then((data) => {
      if (data) {
        res.status(200).send({
          status: "success",
          message: "Instrument data",
          data: data,
        });
      } else {
        res.status(404).send({
          message: `Cannot find Instrument with id ${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error retrieving Instrument with id = ${id}`,
      });
    });
};

exports.update = (req, res) => {
  // console.log(req.body);
  const id = req.params.id;
  const find = Instrument.findOne({ where: { id: id } });
  const data = {
    name: req.body.name,
    unit_id: req.body.unit_id,
    cat_id: req.body.cat_id,
    info: req.body.info,
    status: parseInt(req.body.status),
  };

  if (find) {
    Instrument.update(data, { where: { id: id } })
      .then((data) => {
        res.status(200).send({
          message: `Successfully updated Instrument ${data}`,
        });
      })
      .catch((err) => {
        res.status(404).send({
          message: `Failed to update Instrument with id = ${id}`,
        });
      });
  } else {
    errorResponse(404, "FAILED", "Instrument not found", res);
  }
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Instrument.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Instrument was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Instrument with id=${id}. Maybe Instrument was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Instrument with id=" + id,
      });
    });
};

exports.deleteAll = (req, res) => {
  Instrument.destroy({ where: {}, truncate: false })
    .then((data) => {
      res.status(200).send(`${data} Instruments deleted successfully`);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while deleting all Instruments",
      });
    });
};
