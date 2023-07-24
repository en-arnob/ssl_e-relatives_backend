module.exports = app => {

    const rolePermissionRouter = require("express").Router();
    const rolePermissionController = require("../controllers/rolepermission.controller");

    // Role Permission Post ::utsob::
    rolePermissionRouter.post("/post", rolePermissionController.saveData)
    rolePermissionRouter.get("/", rolePermissionController.getData)

    app.use("/api/role-permission", rolePermissionRouter);

}