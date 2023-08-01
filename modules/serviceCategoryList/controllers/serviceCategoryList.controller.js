const db = require("../../../config/database.config");
const errorResponse = require("../../../utils/errorResponse");
const successResponse = require("../../../utils/successResponse");

const ServiceCategoryList = db.model.serviceCategoryList;
const Role = db.model.role;
const ServiceCategory = db.model.ServiceCategory;

exports.create = async (req, res) => {
  try {
    const serviceData = req.body;
    console.log(req.body.name);

    if (!serviceData) {
      errorResponse(400, "FAILED", "Content can not be empty!", res);
    } else {
      const dataObj = {
        name: req.body.name,
        info: req.body.info,
        role_id: req.body.roleID,
        service_category_id: req.body.serviceCategoryID,
        status: req.body.status,
      };

      const data = await ServiceCategoryList.create(dataObj);
      successResponse(201, "OK", data, res);
    }
  } catch (err) {
    errorResponse(
      500,
      "ERROR",
      err.message || "Some error occurred while creating the User Role.",
      res
    );
  }
};
exports.findAll = async (req, res) => {
  try {
    const data = await ServiceCategoryList.findAll({
      include: [
        {
          model: Role,
          attributes: ["name"],
        },
        {
          model: ServiceCategory,
          attributes: ["name"],
        },
      ],
    });
    if (data.length > 0) {
      successResponse(200, "OK", data, res);
    } else {
      res.send({ message: "No user found" });
    }
  } catch (err) {
    errorResponse(
      500,
      "ERROR",
      err.message || "Some error occurred while creating the Post.",
      res
    );
  }
};

// exports.findAll = async (req, res) => {
//   try {
//     const data = await ServiceCategoryList.findAll({
//       include: [
//         {
//           model: Role,
//           attributes: ['name'],
//         },
//       ],
//     });

//     if (data.length > 0) {
//       successResponse(200, 'OK', data, res);
//     } else {
//       res.send({ message: 'No User Found!' });
//     }
//   } catch (err) {
//     errorResponse(
//       500,
//       'ERROR',
//       err.message || 'Some error occurred while creating the Post.',
//       res
//     );
//   }
// };

// exports.findOne = async (req, res) => {
//   try {
//     const id = req.params.id;
//     // console.log(id);

//     const data = await Drug.findOne({
//       where: {
//         id: id,
//       },
//       include: [
//         {
//           model: DrugGroup,
//           attributes: ['name', 'info'],
//         },
//       ],
//     });

//     if (data) {
//       res.status(200).send({
//         status: 'success',
//         message: 'single drug data',
//         data: data,
//       });
//     } else {
//       res.status(404).send({
//         message: `Cannot find Drug with id=${id}.`,
//       });
//     }
//   } catch (err) {
//     errorResponse(
//       500,
//       'ERROR',
//       err.message || 'Some error occurred while creating the Post.',
//       res
//     );
//   }
// };

exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const serviceData = req.body;
    console.log(serviceData);
    console.log(req.body.name);

    const query = await ServiceCategoryList.findByPk(id);

    if (query) {
      const updateDoc = {
        name: req.body.name,
        info: req.body.info,
        role_id: req.body.roleID,
        service_category_id: req.body.serviceCategoryID,
        status: req.body.status,
      };

      const data = await ServiceCategoryList.update(updateDoc, {
        where: {
          id: id,
        },
      });
      res.status(200).send({
        status: "success",
        message: "Updated successfully",
        data: data,
      });
    } else {
      res.status(404).send({
        message: `Cannot find with id=${req.params.id}.`,
      });
    }
  } catch (err) {
    errorResponse(
      500,
      "ERROR",
      err.message || "Some error occurred while creating the Post.",
      res
    );
  }
};

exports.delete = async (req, res) => {
  try {
    const id = req.params.id;

    const query = await ServiceCategoryList.findByPk(id);
    if (query) {
      const result = await ServiceCategoryList.destroy({
        where: {
          id: id,
        },
      });

      res.send({ data: result, message: "Deleted Successfully!" });
    } else {
      res.send({
        message: `Cannot delete User with id=${id}. Maybe User was not found!`,
      });
    }
  } catch (err) {
    errorHandler(
      500,
      "ERROR",
      err.message || "Some error occurred while creating the User.",
      res
    );
  }
};

exports.getServiceListByCat = async (req, res) => {
  const catId = req.params.id;
  try {
    const data = await ServiceCategoryList.findAll({
      where: {
        service_category_id: catId,
      },
    });

    if (data.length > 0) {
      successResponse(200, "OK", data, res);
    } else {
      res.send({ message: "No User Found!" });
    }
  } catch (err) {
    errorHandler(
      500,
      "ERROR",
      err.message || "Some error occurred while creating the User.",
      res
    );
  }
};
