const db = require("../../../config/database.config");
const Room = db.model.room;
const Op = db.DataTypes.Op;

const AppError = require("../../../utils/appError.js");
const errorResponse = require("../../../utils/errorResponse");
const successResponse = require("../../../utils/successResponse");

exports.create = (req, res) => {
  console.log(req.body);
  // Validate request data
  if (!req.body.name) {
    errorResponse(400, "FAILED", "Content cannot be displayed", res);
  }

  const data = {
    name: req.body.name,
    floor: req.body.floor,
    info: req.body.info,
    status: parseInt(req.body.status),
    // status: req.body.status,
    // created_by: req.body.created_by,
    // updated_by: req.body.updated_by
  };

  // console.log(data);
  // call model function for inserting data in database
  Room.create(data)
    .then((data) => {
      console.log(data.toJSON());

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
  Room.findAll()
    .then((data) => {
      successResponse(200, "OK", data, res);
    })
    .catch((err) => {
      errorResponse(
        500,
        "ERROR",
        err.message || "Some error occurred while finding the Rooms",
        res
      );
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Room.findOne({ where: { id: id } })
    .then((data) => {
      if (data) {
        res.status(200).send({
          status: "success",
          message: "Room data",
          data: data,
        });
      } else {
        res.status(404).send({
          message: `Cannot find Room with id ${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error retrieving Room with id = ${id}`,
      });
    });
};

exports.update = (req, res) => {
  // console.log(req.body);
  const id = req.params.id;
  const find = Room.findOne({ where: { id: id } });
  const data = {
    name: req.body.name,
    floor: req.body.floor,
    info: req.body.info,
    status: parseInt(req.body.status),
    // status: req.body.status,
    // created_by: req.body.created_by,
    // updated_by: req.body.updated_by
  };

  if (find) {
    Room.update(data, { where: { id: id } })
      .then((data) => {
        res.status(200).send({
          message: `Successfully updated Room ${data}`,
        });
      })
      .catch((err) => {
        res.status(404).send({
          message: `Failed to update Room with id = ${id}`,
        });
      });
  } else {
    errorResponse(404, "FAILED", "Room not found", res);
  }
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Room.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Room was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Room with id=${id}. Maybe Room was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Room with id=" + id,
      });
    });
};

exports.deleteAll = (req, res) => {
  Room.destroy({ where: {}, truncate: false })
    .then((data) => {
      res.status(200).send(`${data} Rooms deleted successfully`);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while deleting all Rooms",
      });
    });
};
