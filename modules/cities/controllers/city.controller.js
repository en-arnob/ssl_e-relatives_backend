const db = require("../../../config/database.config");
const State = db.model.state;
const City = db.model.city;
const Country = db.model.country;
const Op = db.DataTypes.Op;

const AppError = require("../../../utils/appError.js");
const errorResponse = require("../../../utils/errorResponse");
const successResponse = require("../../../utils/successResponse");

exports.create = (req, res) => {
  if (!req.body.name && !req.body.state_id) {
    errorResponse(400, "FAILED", "Content cannot be displayed", res);
  }

  const data = {
    name: req.body.name,
    state_id: req.body.state_id,
    status: parseInt(req.body.status),
  };

  // console.log(data);
  // call model function for inserting data in database
  City.create(data)
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

exports.getCountryId = (req, res) => {
  Country.findAll({ attributes: ["name", "id"] })
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
exports.getStateId = (req, res) => {
  const id = req.params.id;
  State.findAll({ where: { country_id: id } }, { attributes: ["name", "id"] })
    .then((data) => {
      successResponse(200, "OK", data, res);
    })
    .catch((err) => {
      errorResponse(
        500,
        "ERROR",
        err.message || "Some error occurred while finding the States",
        res
      );
    });
};

exports.getAll = (req, res) => {
  City.findAll({
    include: [
      {
        model: State,
        attributes: ["name", "id"],
        include: [
          {
            model: Country,
            attributes: ["name", "id"]
          }
        ]
      },
    ],
  })
    .then((data) => {
      successResponse(200, "OK", data, res);
    })
    .catch((err) => {
      errorResponse(
        500,
        "ERROR",
        err.message || "Some error occurred while finding the City",
        res
      );
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  City.findOne({ where: { id: id } })
    .then((data) => {
      if (data) {
        res.status(200).send({
          status: "success",
          message: "State data",
          data: data,
        });
      } else {
        res.status(404).send({
          message: `Cannot find City with id ${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error retrieving State with id = ${id}`,
      });
    });
};

exports.update = (req, res) => {
  //   console.log(req.body);
  const id = req.params.id;
  const find = City.findOne({ where: { id: id } });
  const data = {
    name: req.body.name,
    state_id: req.body.state_id,
    status: parseInt(req.body.status),
  };

  if (find) {
    City.update(data, { where: { id: id } })
      .then((data) => {
        res.status(200).send({
          message: `Successfully updated City ${data}`,
        });
      })
      .catch((err) => {
        res.status(404).send({
          message: `Failed to update City with id = ${id}`,
        });
      });
  } else {
    errorResponse(404, "FAILED", "City not found", res);
  }
};

exports.delete = (req, res) => {
  const id = req.params.id;

  City.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "City was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete City with id=${id}. Maybe State was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete City with id=" + id,
      });
    });
};

// exports.deleteAll = (req, res) => {
//   State.destroy({ where: {}, truncate: false })
//     .then((data) => {
//       res.status(200).send(`${data} All State deleted successfully`);
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while deleting all State",
//       });
//     });
// };
