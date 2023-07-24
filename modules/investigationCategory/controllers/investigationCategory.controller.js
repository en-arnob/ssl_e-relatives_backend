const db = require("../../../config/database.config");
const InvestigationCategory = db.model.investigationCategory;
const InvestigationGroup = db.model.investigationGroup;
const Op = db.DataTypes.Op;

const AppError = require("../../../utils/appError.js");
const errorResponse = require("../../../utils/errorResponse");
const successResponse = require("../../../utils/successResponse");

exports.create = (req, res) => {
  if (!req.body.name && !req.body.investigation_group_id && !req.body.info) {
    errorResponse(400, "FAILED", "Content cannot be displayed", res);
  }

  const data = {
    name: req.body.name,
    investigation_group_id: req.body.investigation_group_id,
    info: req.body.info,
    status: parseInt(req.body.status),
  };

  // console.log(data);
  // call model function for inserting data in database
  InvestigationCategory.create(data)
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

exports.getGroupId = (req, res) => {
  InvestigationGroup.findAll({ attributes: ["name", "id"] })
    .then((data) => {
      successResponse(200, "OK", data, res);
    })
    .catch((err) => {
      errorResponse(
        500,
        "ERROR",
        err.message || "Some error occurred while finding the Groups",
        res
      );
    });
};

exports.getAll = (req, res) => {
  InvestigationCategory.findAll({
    include: [
      {
        model: InvestigationGroup,
        attributes: ["name", "id"],
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
        err.message || "Some error occurred while finding the Country",
        res
      );
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  InvestigationCategory.findOne({ where: { id: id } })
    .then((data) => {
      if (data) {
        res.status(200).send({
          status: "success",
          message: "InvestigationCategory data",
          data: data,
        });
      } else {
        res.status(404).send({
          message: `Cannot find InvestigationCategory with id ${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error retrieving InvestigationCategory with id = ${id}`,
      });
    });
};

exports.update = (req, res) => {
  //   console.log(req.body);
  const id = req.params.id;
  const find = InvestigationCategory.findOne({ where: { id: id } });
  const data = {
    name: req.body.name,
    investigation_group_id: req.body.investigation_group_id,
    info: req.body.info,
    status: parseInt(req.body.status),
  };

  if (find) {
    InvestigationCategory.update(data, { where: { id: id } })
      .then((data) => {
        res.status(200).send({
          message: `Successfully updated InvestigationCategory ${data}`,
        });
      })
      .catch((err) => {
        res.status(404).send({
          message: `Failed to update InvestigationCategory with id = ${id}`,
        });
      });
  } else {
    errorResponse(404, "FAILED", "InvestigationCategory not found", res);
  }
};

exports.delete = (req, res) => {
  const id = req.params.id;

  InvestigationCategory.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "InvestigationCategory was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete InvestigationCategory with id=${id}. Maybe InvestigationCategory was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete InvestigationCategory with id=" + id,
      });
    });
};

// exports.deleteAll = (req, res) => {
//   InvestigationCategory.destroy({ where: {}, truncate: false })
//     .then((data) => {
//       res.status(200).send(`${data} All InvestigationCategory deleted successfully`);
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while deleting all InvestigationCategory",
//       });
//     });
// };
