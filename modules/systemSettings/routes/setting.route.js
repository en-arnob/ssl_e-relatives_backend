module.exports = app => {
    const settingRouter = require("express").Router()
    const settingController = require("../controllers/setting.controller")

    const uploadMulter = require("../../../middlewares/uploadLogo")

    //update settings
    settingRouter.put("/", settingController.update)

    // retrive settings properties
    settingRouter.get("/", settingController.getData)

    //upload-image
    // settingRouter.post("/image-upload-logo", uploadMulter, settingController.uploadLogo)
    // settingRouter.post("/image-upload-fav", uploadMulter, settingController.uploadFav)

    settingRouter.post("/image-upload", uploadMulter, settingController.upload)


    app.use('/api/settings', settingRouter);
}