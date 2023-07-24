const db = require("../../../config/database.config");
const AccountHead = db.model.accountHead;
const HeadType = db.model.headType;
const Op = db.DataTypes.Op;

const AppError = require("../../../utils/appError.js");
const errorResponse = require("../../../utils/errorResponse");
const successResponse = require("../../../utils/successResponse");


//testing comment
//backend test

// Create and Save a new Post
exports.create = (req, res) => {

  console.log(req.body);
  // Validate request data
  if(!req.body.name && !req.body.info)
  {
    errorResponse(400, "FAILED", "Content cannot be displayed", res);
  }

  // Create a Post model object after validating request data
  const data = {

    head_type_id: req.body.headTypeId,
    code: req.body.code,
    name: req.body.name,
    initial_balance: parseInt(req.body.initialBalance),
    info: req.body.info,
    status: parseInt(req.body.status), 

  }

  // call model function for inserting data in database
  AccountHead.create(data)
  .then((data) => {
    console.log(data.toJSON());

    successResponse(201, "OK", data, res);
  })
  .catch((err) => {
    errorResponse(500, "ERROR", err.message || "Failed to Create, Please try Again!", res);
  })
};

// Retrieve all Posts from the database.
exports.findAll = (req, res) => {
  
    AccountHead.findAll({
      include: [
        {
          model: HeadType,
          attributes: [['name', 'headName']] //name renamed as groupName
        }
      ]
    })
    .then((data) => {
        successResponse(200, "OK", data, res);
    })
    .catch((err) => {
        errorResponse(500, "ERROR", err.message || "Some error occurred while finding the head type", res);
    });

};

// Find a single Post with an id
exports.findOne = (req, res) => {

  const id = req.params.id;

  AccountHead.findOne({ where: { id: id }})
  .then((data) => {

      if(data)
      {
          res.status(200).send({
          status: "success",
          message: "single account head data",
          data: data,
        });
      }
      else
      {
        res.status(404).send({
          message: `Cannot find account head with id ${id}`
        })
      }
  })
  .catch((err) => {
    res.status(500).send({
      message: `Error retrieving account head with id = ${id}`
    });
  });

};

// Update a Post by the id in the request
exports.update = (req, res) => {
  
  console.log(req.body);
  const id = req.params.id;
  const find = AccountHead.findOne({ where: { id: id}});
  const data = {

    head_type_id: req.body.headTypeId,
    code: req.body.code,
    name: req.body.name,
    initial_balance: req.body.initialBalance,
    info: req.body.info,
    status: parseInt(req.body.status),   

  }

  if(find)
  {
    AccountHead.update(data, { where: { id: id} })
    .then((data) => {
      res.status(200).send({
        message: `Successfully updated account head ${data}`
      })
    }) 
    .catch((err) => {
      res.status(404).send({
        message: `Failed to update account head with id = ${id}`
      });
    });;
  }
  else
  {
    errorResponse(404, "FAILED", "Account head not found", res);
  }

};

// Delete a Post with the specified id in the request
exports.delete = (req, res) => {
 
  const id = req.params.id;

  AccountHead.destroy({
    where: { id: id }
  })
  .then(num => {
      if (num == 1) {
        res.send({
          message: "Account head was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Account head type with id=${id}. Maybe Account head was not found!`
        });
      }
  })
  .catch(err => {
      res.status(500).send({
        message: "Could not delete Account head with id=" + id
      });
  });

};

// Delete all Posts from the database.
exports.deleteAll = (req, res) => {

  AccountHead.destroy({where: {}, truncate: false})
  .then((data) => {
    res.status(200).send(`${data} Account head deleted successfully`);
  })
  .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while deleting all account heads"
    });
  });
  
};





