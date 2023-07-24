const db = require("../../../config/database.config");
const Investigation = db.model.investigation;
const Room = db.model.room;
const Group = db.model.investigationGroup;
const Category = db.model.investigationCategory;
const Instrument = db.model.instrument;
const InvestigationInstrument = db.model.investigationInstrument;
const UOM = db.model.uom;
const Op = db.DataTypes.Op;

const AppError = require("../../../utils/appError.js");
const errorResponse = require("../../../utils/errorResponse");
const successResponse = require("../../../utils/successResponse");

exports.create = (req, res) => {
  //   if (!req.body.code && !req.body.name) {
  //     return errorResponse(400, "FAILED", "Content cannot be displayed", res);
  //   }

  let reqdata = req.body;
  //   console.log(reqdata);
  let instTable = reqdata.instrumentTable;

  Investigation.create(reqdata.investigationTable)
    .then((data) => {
      //   console.log(data.toJSON().id);
      const newInvestigationId = data.toJSON().id;
      instTable.forEach((element) => {
        element.investigation_id = newInvestigationId;
      });
      //   console.log(instTable);
      for (const row of instTable) {
        InvestigationInstrument.create(row)
          .then((data) => {
            // return successResponse(201, "OK", data, res);
          })
          .catch((err) => {
            return errorResponse(
              500,
              "ERROR",
              err.message || "Failed to Register, Please try Again!",
              res
            );
          });
      }

      return successResponse(201, "OK", data, res);
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

exports.getRoomData = (req, res) => {
  Room.findAll({ attributes: ["name", "id"] })
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

exports.getGroupData = (req, res) => {
  Group.findAll({ attributes: ["name", "id"] })
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
exports.getCategoryData = (req, res) => {
  const id = req.params.id;
  Category.findAll({
    where: { investigation_group_id: id },
    attributes: ["name", "id", "investigation_group_id"],
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
exports.getInstrumentData = (req, res) => {
  Instrument.findAll({
    attributes: ["name", "id"],
    include: {
      model: UOM,
      attributes: ["name", "symbol"],
    },
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

exports.getAll = (req, res) => {
  Investigation.findAll({
    include: [
      {
        model: Room,
        attributes: ["name"],
      },
      {
        model: Group,
        attributes: ["name"],
      },
      {
        model: Category,
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

  Investigation.findOne({ where: { id: id } })
    .then((data) => {
      if (data) {
        res.status(200).send({
          status: "success",
          message: "Investigation data",
          data: data,
        });
      } else {
        res.status(404).send({
          message: `Cannot find Investigation with id ${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error retrieving Investigation with id = ${id}`,
      });
    });
};
exports.getInvInst = (req, res) => {
  const id = req.params.id;

  InvestigationInstrument.findAll({ where: { investigation_id: id } })
    .then((data) => {
      if (data) {
        res.status(200).send({
          status: "success",
          message: "InvestigationInstrument data",
          data: data,
        });
      } else {
        res.status(404).send({
          message: `Cannot find InvestigationInstrument with id ${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error retrieving InvestigationInstrument with id = ${id}`,
      });
    });
};

exports.update = (req, res) => {
  //   console.log(req.body);
  const id = req.params.id;
  const find = Investigation.findOne({ where: { id: id } });
  let reqdata = req.body;
  //   console.log(reqdata);
  let instTable = reqdata.instrumentTable;

  if (find) {
    Investigation.update(reqdata.investigationTable, { where: { id: id } })
      .then((data) => {
        InvestigationInstrument.destroy({ where: { investigation_id: id } });
        instTable.forEach((element) => {
          element.investigation_id = id;
        });
        for (const row of instTable) {
          InvestigationInstrument.create(row)
            .then((data) => {
              // return successResponse(201, "OK", data, res);
            })
            .catch((err) => {
              return errorResponse(
                500,
                "ERROR",
                err.message || "Failed to Register, Please try Again!",
                res
              );
            });
        }
        return successResponse(201, "OK", data, res);
        // res.status(200).send({
        //   message: `Successfully updated Investigation ${data}`,
        // });
      })
      .catch((err) => {
        res.status(404).send({
          message: `Failed to update Investigation with id = ${id}`,
        });
      });
  } else {
    errorResponse(404, "FAILED", "Investigation not found", res);
  }
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Investigation.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Investigation was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Investigation with id=${id}. Maybe State was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Investigation with id=" + id,
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
