const db = require("../../../config/database.config");
const ServiceCategory = db.model.ServiceCategory;
const Role = db.model.role;
const errorResponse = require("../../../utils/errorResponse");
const successResponse = require("../../../utils/successResponse");

// Create and Save a new content group
exports.create = (req, res) => {
  console.log(req.body);

  // Validate request data
  if (!req.body.name && !req.body.info) {
    errorResponse(400, "FAILED", "Content cannot be displayed", res);
  }

  // Create a Post model object after validating request data
  const data = {
    name: req.body.name,
    info: req.body.info,
    role_id: req.body.roleID,
    status: parseInt(req.body.status),

    // created_by: req.body.created_by,
    // updated_by: req.body.updated_by
  };

  // call model function for inserting data in database
  ServiceCategory.create(data)
    .then((data) => {
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

// Retrieve all content groups from the database.
exports.findAll = (req, res) => {
  ServiceCategory.findAll({
    include: [
      {
        model: Role,
        attributes: ["name"],
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
        err.message || "Some error occurred while finding the post",
        res
      );
    });
};

// Find a single content with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  ServiceCategory.findOne({ where: { id: id } })
    .then((data) => {
      if (data) {
        res.status(200).send({
          status: "success",
          message: "single post data",
          data: data,
        });
      } else {
        res.status(404).send({
          message: `Cannot find activity with id ${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error retrieving activity with id = ${id}`,
      });
    });
};

// Update a content by the id in the request
exports.update = (req, res) => {
  console.log(req.body);
  const id = req.params.id;
  const find = ServiceCategory.findOne({ where: { id: id } });

  const data = {
    name: req.body.name,
    info: req.body.info,
    status: parseInt(req.body.status),
    role_id: req.body.roleID,
  };

  if (find) {
    ServiceCategory.update(data, { where: { id: id } })
      .then((data) => {
        res.status(200).send({
          message: `Successfully updated activity ${data}`,
        });
      })
      .catch((err) => {
        res.status(404).send({
          message: `Failed to update activity with id = ${id}`,
        });
      });
  } else {
    errorResponse(404, "FAILED", "Activity not found", res);
  }
};

// Delete a content with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  const find = ServiceCategory.findOne({ where: { id: id } });

  if (find) {
    ServiceCategory.destroy({ where: { id: id } })
      .then((data) => {
        res.status(200).send({
          message: `Successfully deleted activity with id ${id}`,
        });
      })
      .catch((err) => {
        res.status(404).send({
          message: `Failed to delete activity with id ${id}`,
        });
      });
  } else {
    errorResponse(404, "FAILED", "Activity not found", res);
  }
};

// Delete all contens from the database.
exports.deleteAll = (req, res) => {
  ServiceCategory.destroy({ where: {}, truncate: false })
    .then((data) => {
      res.status(200).send(`${data} Activities deleted successfully `);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while deleting all activities",
      });
    });
};

exports.findByRole = (req, res) => {
  const roleId = req.params.roleId;
  ServiceCategory.findAll({
    where: {
      role_id: roleId,
    },
    attributes: ["id", "name", "info", "role_id"],
  })
    .then((data) => {
      successResponse(200, "OK", data, res);
    })
    .catch((err) => {
      errorResponse(
        500,
        "ERROR",
        err.message || "Some error occurred while finding the post",
        res
      );
    });
};

// exports.findByRole = (req, res) => {
//   const roleId = req.params.roleId;
//   ServiceCategory.findAll({
//     where: {
//       role_id: roleId,
//     },
//     include: [
//       {
//         model: Role, // Include the Role model
//         attributes: ["name"], // Specify the attributes you want to fetch from the Role model
//       },
//     ],
//   })
//     .then((data) => {
//       res.status(200).json({
//         status: "success",
//         message: "Data found",
//         data: data,
//       });
//     })
//     .catch((err) => {
//       res.status(500).json({
//         status: "error",
//         message: "Some error occurred while finding the data",
//         error: err.message,
//       });
//     });
// };
