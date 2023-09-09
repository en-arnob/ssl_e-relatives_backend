const fileUploadTypeRouter = require("express").Router();
const fileUploadTypeController = require("../controllers/fileUploadType.controller");

module.exports = (app) => {
  // create fileUploadType
  fileUploadTypeRouter.post("/", fileUploadTypeController.createNew);

  //get all file upload types
  fileUploadTypeRouter.get("/", fileUploadTypeController.getAll);

  // delete fileUploadType by id
  fileUploadTypeRouter.delete("/:id", fileUploadTypeController.delete);

  // update fileUploadType by id
  fileUploadTypeRouter.put("/:id", fileUploadTypeController.update);

  app.use("/api/file-upload-type", fileUploadTypeRouter);
};
