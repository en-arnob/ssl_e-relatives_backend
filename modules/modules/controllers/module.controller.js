const db = require("../../../config/database.config");
const Module = db.model.module;
const Activity = db.model.activity;

const Op = db.DataTypes.Op;

const AppError = require("../../../utils/appError.js");
const errorResponse = require("../../../utils/errorResponse");
const successResponse = require("../../../utils/successResponse");

// Create and Save a new Post
exports.create = (req, res) => {
  
  console.log(req.body.activities.map((x) => x));

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
  }

  // call model function for inserting data in database
  Module.create(data)
  .then((data) => {
    const moduleId = data.id;
    this.addActivity(moduleId, req.body.activities);
    successResponse(201, "OK", data, res);
  })
  .catch((err) => {
    errorResponse(500, "ERROR", err.message || "Failed to Register, Please try Again!", res);
  });
  console.log(req.body);

};

//add activity 
exports.addActivity = (moduleId, activities) => {

  //loop start
    activities.map((activity) => {
      return Module.findByPk(moduleId)
      .then((module) => {
        if (!module) {
          console.log("Module not found!");
          return null;
        }
        return Activity.findByPk(activity)
        .then((activity) => {
          if (!activity) {
            console.log("Activity not found!");
            return null;
          }
          module.addActivity(activity);
          console.log(`>> added Activity id=${activity.id} to Module id=${module.id}`);
          return module;
        });
      })
      .catch((err) => {
        console.log(">> Error while adding Activity to Module: ", err);
      });
    });
      
  
 
  //loop close
};

//update activity
// module.updateActivities = (moduleId, activities) => {
//   // Get the current activities associated with the module
//   return moduleId.getActivities()
//     .then((currentActivities) => {
//       const currentActivityIds = currentActivities.map((activity) => activity.id);
//       const newActivityIds = activities.filter((activityId) => !currentActivityIds.includes(activityId));

//       // Add new activities to the module
//       const activityPromises = newActivityIds.map((activityId) => {
//         return Activity.findByPk(activityId)
//           .then((activity) => {
//             if (!activity) {
//               console.log(`Activity with ID ${activityId} not found`);
//               return null;
//             }
//             return moduleId.addActivity(activity);
//           });
//       });

//       // Wait for all promises to resolve
//       return Promise.all(activityPromises);
//     });
// };
module.updateActivities = (moduleId, activities) => {
  // Remove all existing associations
  moduleId.setActivities([]);

  // Loop through the activities and add them to the module
  const activityPromises = activities.map((activityId) => {
    return Activity.findByPk(activityId)
      .then((activity) => {
        if (!activity) {
          console.log(`Activity with ID ${activityId} not found`);
          return null;
        }
        return moduleId.addActivity(activity);
      });
  });

  // Wait for all promises to resolve
  return Promise.all(activityPromises);
};


// Retrieve all Posts from the database.
exports.findAll = (req, res) => {
  
    Module.findAll({
      include: [
        {
          model: Activity,
          as: 'activities',
          attributes: ["id"],
          through: {
            attributes: ["module_id", "activity_id"],
          }
        }
      ]
    })
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

  Module.findOne({ where: { id: id }})
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
  const id = req.params.id;
  console.log(req.body);
  // Get the module instance
  Module.findByPk(id)
    .then((moduleId) => {
      if (!moduleId) {
        return res.status(404).send({
          message: `Module not found with id = ${id}`
        });
      }

      // Update basic information
      const data = {
        name: req.body.name,
        info: req.body.info,
        status: parseInt(req.body.status),
      };

      moduleId.update(data)
        .then(() => {
          // Update activities
          module.updateActivities(moduleId, req.body?.activities)
            .then(() => {
              res.status(200).send({
                message: `Successfully updated module with id = ${id}`
              });
            })
            .catch((err) => {
              res.status(500).send({
                message: `Error updating activities: ${err.message}`
              });
            });
        })
        .catch((err) => {
          res.status(500).send({
            message: `Error updating module: ${err.message}`
          });
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error finding module: ${err.message}`
      });
    });
};

// Delete a Post with the specified id in the request
exports.delete = (req, res) => {
 
  const id = req.params.id;
  const find = Module.findOne({where: {id: id}});

  if(find)
  {
    Module.destroy({ where: {id: id}})
    .then((data) => {
      res.status(200).send({
        message: `Successfully deleted module with id ${id}`
      })
    })
    .catch((err) => {
      res.status(404).send({
        message: `Failed to delete module with id ${id}`
      });
    });
  }
  else
  {
    errorResponse(404, "FAILED", "Module not found", res);
  }

};

// Delete all Posts from the database.
exports.deleteAll = (req, res) => {
  Module.destroy({where: {}, truncate: false})
  .then((data) => {
    res.status(200).send(`${data} Modules deleted successfully `);
  })
  .catch((err) => {
    res.status(500).send({
      message: err.message || "Some error occurred while deleting all modules"
  });
  });
};






