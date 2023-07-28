const db = require("../../../config/database.config");
const Activity = db.model.activity;
const Op = db.DataTypes.Op;

const AppError = require("../../../utils/appError.js");
const errorResponse = require("../../../utils/errorResponse");
const successResponse = require("../../../utils/successResponse");

// Create and Save a new Post
exports.create = (req, res) => {

  // console.log(req.body);
  // Validate request data
  if(!req.body.name && !req.body.info)
  {
    errorResponse(400, "FAILED", "Content cannot be displayed", res);
  }

  // Create a Post model object after validating request data
  const data = {

    name: req.body.name,
    info: req.body.info,
    status: parseInt(req.body.status),    
    // status: req.body.status,
    // created_by: req.body.created_by,
    // updated_by: req.body.updated_by
  }

  // console.log(data);
  // call model function for inserting data in database
  Activity.create(data)
  .then((data) => {
    // console.log(data.toJSON());

    successResponse(201, "OK", data, res);
  })
  .catch((err) => {
    errorResponse(500, "ERROR", err.message || "Failed to Register, Please try Again!", res);
  })
};

// Retrieve all Posts from the database.
exports.findAll = (req, res) => {
  
    Activity.findAll()
    .then((data) => {
        successResponse(200, "OK", data, res);
    })
    .catch((err) => {
        errorResponse(500, "ERROR", err.message || "Some error occurred while finding the post", res);
    });

};

// Find a single Post with an id
exports.findOne = (req, res) => {

  const id = req.params.id;

  Activity.findOne({ where: { id: id }})
  .then((data) => {

      if(data)
      {
          res.status(200).send({
          status: "success",
          message: "single post data",
          data: data,
        });
      }
      else
      {
        res.status(404).send({
          message: `Cannot find activity with id ${id}`
        })
      }
  })
  .catch((err) => {
    res.status(500).send({
      message: `Error retrieving activity with id = ${id}`
    });
  });

};

// Update a Post by the id in the request
exports.update = (req, res) => {
  
  // console.log(req.body);
  const id = req.params.id;
  const find = Activity.findOne({ where: { id: id}});
  const data = {

    name: req.body.name,
    info: req.body.info,
    status: parseInt(req.body.status),    
    // status: req.body.status,
    // created_by: req.body.created_by,
    // updated_by: req.body.updated_by
  }

  if(find)
  {
    Activity.update(data, { where: { id: id} })
    .then((data) => {
      res.status(200).send({
        message: `Successfully updated activity ${data}`
      })
    }) 
    .catch((err) => {
      res.status(404).send({
        message: `Failed to update activity with id = ${id}`
      });
    });;
  }
  else
  {
    errorResponse(404, "FAILED", "Activity not found", res);
  }

};

// Delete a Post with the specified id in the request
exports.delete = (req, res) => {
 
  const id = req.params.id;

  Activity.destroy({
    where: { id: id }
  })
  .then(num => {
      if (num == 1) {
        res.send({
          message: "Post was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Post with id=${id}. Maybe Post was not found!`
        });
      }
  })
  .catch(err => {
      res.status(500).send({
        message: "Could not delete Tutorial with id=" + id
      });
  });

};

// Delete all Posts from the database.
exports.deleteAll = (req, res) => {

  Activity.destroy({where: {}, truncate: false})
  .then((data) => {
    res.status(200).send(`${data} Activities deleted successfully`);
  })
  .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while deleting all activities"
    });
  });
  
};





