const db = require("../../../config/database.config.js");
const FileUpT = db.model.fileUpType;
const errorResponse = require("../../../utils/errorResponse");
const successResponse = require("../../../utils/successResponse");

exports.createNew = async (req, res) => {
  const fileUploadTypeData = req.body;

  try {
    const newFileUploadType = await FileUpT.create({
      name: fileUploadTypeData.name,
      extensions: fileUploadTypeData.extensions,
      file_size: fileUploadTypeData.file_size,
      info: fileUploadTypeData.info,
      status: fileUploadTypeData.status,
    });

    successResponse(200, "OK", newFileUploadType, res);
  } catch (e) {
    errorResponse(
      500,
      "ERROR",
      e.message || "Some error occurred while Creating FileUploadType",
      res,
    );
  }
};

exports.getAll = (req, res) => {
  FileUpT.findAll()
    .then((data) => {
      successResponse(200, "OK", data, res);
    })
    .catch((err) => {
      errorResponse(
        500,
        "ERROR",
        err.message || "Some error occurred while finding the post",
        res,
      );
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  FileUpT.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "File Type was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete File Type with id=${id}. Maybe Gender was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete File Type with id=" + id,
      });
    });
};

exports.update = async (req, res) => {
  const id = req.params.id;
  const fileTypeData = req.body;

  try {
    const fileType = await FileUpT.findByPk(id);
    if (fileType) {
      const updatedFileType = await FileUpT.update(
        {
          name: fileTypeData.name,
          extensions: fileTypeData.extensions,
          file_size: fileTypeData.file_size,
          info: fileTypeData.info,
          status: fileTypeData.status,
        },
        {
          where: {
            id: id,
          },
        },
      );
      if (updatedFileType) {
        successResponse(200, "OK", updatedFileType, res);
      }
    }
  } catch (e) {
    errorResponse(
      500,
      "ERROR",
      e.message || "Some error occurred while Editing File Type",
      res,
    );
  }
};
