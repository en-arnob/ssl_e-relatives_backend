
module.exports = app => {

    const AccountHeadRouter = require("express").Router();
    const AccountHeadController = require("../controllers/accountHead.controller");

    // Create a new Post
    AccountHeadRouter.post("/", AccountHeadController.create);
    // Retrieve all Posts
    AccountHeadRouter.get("/", AccountHeadController.findAll);
    // Retrieve a single Post with id
    AccountHeadRouter.get("/:id", AccountHeadController.findOne);
    // Update a Post with id
    AccountHeadRouter.put("/:id", AccountHeadController.update);
    // Delete a Post with id
    AccountHeadRouter.delete("/:id", AccountHeadController.delete);
    // Delete all Posts
    AccountHeadRouter.delete("/", AccountHeadController.deleteAll);

    app.use("/api/account-head", AccountHeadRouter);


}