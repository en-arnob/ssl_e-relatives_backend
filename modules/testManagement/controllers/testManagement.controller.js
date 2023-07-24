const db = require("../../../config/database.config");
const Investigation = db.model.investigation;
const UOM = db.model.uom;
const InvestigationTest = db.model.investigationTest;
const errorResponse = require("../../../utils/errorResponse");
const successResponse = require("../../../utils/successResponse");

exports.getInvestigations = (req, res) => {
  Investigation.findAll({
    attributes: ["name", "id", "report_type"],
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

exports.getUOMData = (req, res) => {
  UOM.findAll({
    attributes: ["name", "id"],
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

exports.saveData = async (req, res) => {
  const data = req.body;
  const investigationId = data.investigationId;
  const testData = data.testData;
  testData.forEach((element) => {
    element.investigation_id = investigationId;
    if (element.status == true) {
      element.status = 1;
    } else {
      element.status = 0;
    }
  });

  try {
    const deletionPromise = testData.map((obj) =>
      InvestigationTest.destroy({
        where: { investigation_id: obj.investigation_id },
      })
    );
    await Promise.all(deletionPromise);
    const creationPromise = testData.map((obj) =>
      InvestigationTest.create(obj)
    );
    await Promise.all(creationPromise);
    return successResponse(201, "OK", data, res);
  } catch (error) {
    console.log(error);
  }
};

exports.getAll = (req, res) => {
  const id = req.params.id;
  InvestigationTest.findAll({ where: { investigation_id: id } })
    .then((data) => {
      data.forEach((element) => {
        if (element.status === 1) {
          element.status = true;
        } else {
          element.status = false;
        }
      });
      successResponse(200, "OK", data, res);
    })
    .catch((err) => {
      errorResponse(
        500,
        "ERROR",
        err.message ||
          "Some error occurred while finding the InvestigationTests",
        res
      );
    });
};
