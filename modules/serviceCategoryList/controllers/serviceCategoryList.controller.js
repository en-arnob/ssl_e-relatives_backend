const db = require('../../../config/database.config');
const errorResponse = require('../../../utils/errorResponse');
const successResponse = require('../../../utils/successResponse');

const ServiceCategoryList = db.model.serviceCategoryList;
// const DrugGroup = db.model.drugGroup;

exports.create = async (req, res) => {
  try {
    const drugData = req.body;
    console.log(req.body.name);

    if (!drugData) {
      errorResponse(400, 'FAILED', 'Content can not be empty!', res);
    } else {
      const dataObj = {
        name: req.body.name,
        info: req.body.info,
        role_id: req.body.roleID,
        service_category_id: req.body.serviceCategoryID,
        status: req.body.status,
      };

      const data = await ServiceCategoryList.create(dataObj);
      successResponse(201, 'OK', data, res);
    }
  } catch (err) {
    errorResponse(
      500,
      'ERROR',
      err.message || 'Some error occurred while creating the User Role.',
      res
    );
  }
};

// exports.findAll = async (req, res) => {
//   try {
//     const data = await Drug.findAll({
//       include: [
//         {
//           model: DrugGroup,
//           attributes: ['name', 'info'],
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

// exports.update = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const drugData = req.body;

//     const query = await Drug.findByPk(id);

//     if (query) {
//       if (drugData?.name && drugData?.drugGroup) {
//         const updateDoc = {
//           name: drugData.name,
//           info: drugData.info,
//           drug_group_id: drugData.drugGroup,
//           status: drugData.status,
//         };

//         const data = await Drug.update(updateDoc, {
//           where: {
//             id: id,
//           },
//         });
//         res.status(200).send({
//           status: 'success',
//           message: 'Drug updated successfully',
//           data: data,
//         });
//       } else {
//         res.send({
//           status: 'error',
//           message: 'Required Fields Cannot be Empty!!!',
//         });
//       }
//     } else {
//       res.status(404).send({
//         message: `Cannot find Drug with id=${req.params.id}.`,
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

// exports.delete = async (req, res) => {
//   try {
//     const id = req.params.id;

//     const query = await Drug.findByPk(id);
//     if (query) {
//       const result = await Drug.destroy({
//         where: {
//           id: id,
//         },
//       });

//       res.send({ data: result, message: 'Drug deleted Successfully!' });
//     } else {
//       res.send({
//         message: `Cannot delete User with id=${id}. Maybe User was not found!`,
//       });
//     }
//   } catch (err) {
//     errorHandler(
//       500,
//       'ERROR',
//       err.message || 'Some error occurred while creating the User.',
//       res
//     );
//   }
// };
