const errorHandler = require('../../../utils/errorHandler');
const errorResponse = require('../../../utils/errorResponse');
const successResponse = require('../../../utils/successResponse');
const db = require('../../../config/database.config');

const DrugGroup = db.model.drugGroup;

exports.create = async (req, res) => {
  try {
    const drugGroupData = req.body;
    console.log(drugGroupData);

    if (!drugGroupData) {
      errorResponse(400, 'FAILED', 'Content can not be empty!', res);
    } else {
      const dataObj = {
        name: drugGroupData.name,
        info: drugGroupData.info,
        status: drugGroupData.status,
      };

      const data = await DrugGroup.create(dataObj);
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

exports.findAll = async (req, res) => {
  try {
    const query = await DrugGroup.findAll();
    if (query.length > 0) {
      successResponse(200, 'OK', query, res);
    } else {
      res.send({ message: 'No Drug Grpup Found!' });
    }
  } catch (err) {
    errorResponse(
      500,
      'ERROR',
      err.message || 'Some error occurred while finding Users Role.',
      res
    );
  }
};

exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);

    const data = await DrugGroup.findByPk(id);

    if (data) {
      res.status(200).send({
        status: 'success',
        message: 'single Drug Group data',
        data: data,
      });
    } else {
      res.status(404).send({
        message: `Cannot find Drug Group with id=${id}.`,
      });
    }
  } catch (err) {
    errorResponse(
      500,
      'ERROR',
      err.message || 'Some error occurred while creating the Post.',
      res
    );
  }
};

exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const drugGrpupData = req.body;

    const query = await DrugGroup.findByPk(id);

    if (query) {
      if (drugGrpupData?.name) {
        const updateDoc = {
          name: drugGrpupData.name,
          info: drugGrpupData.info,
          status: drugGrpupData.status,
        };
        const data = await DrugGroup.update(updateDoc, {
          where: {
            id: id,
          },
        });
        res.status(200).send({
          status: 'success',
          message: 'Drug Group updated successfully',
          data: data,
        });
      } else {
        res.send({
          status: 'error',
          message: 'Required Fields Cannot be Empty!!!',
        });
      }
    } else {
      res.status(404).send({
        message: `Cannot find Drug Group with id=${req.params.id}.`,
      });
    }
  } catch (err) {
    errorResponse(
      500,
      'ERROR',
      err.message || 'Some error occurred while Updateing the User Role.',
      res
    );
  }
};

exports.delete = async (req, res) => {
  try {
    const id = req.params.id;

    const query = await DrugGroup.findByPk(id);
    if (query) {
      const result = await DrugGroup.destroy({
        where: {
          id: id,
        },
      });

      if (result === 1) {
        res.send({ data: result, message: 'Drug Group deleted Successfully!' });
      }
    } else {
      res.send({
        message: `Cannot delete Drug Group with id=${id}. Maybe Drug Group was not found!`,
      });
    }
  } catch (err) {
    errorHandler(
      500,
      'ERROR',
      err.message || 'Some error occurred while Deleting User Role.',
      res
    );
  }
};
