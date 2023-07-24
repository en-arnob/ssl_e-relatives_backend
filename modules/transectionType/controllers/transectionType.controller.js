const errorHandler = require('../../../utils/errorHandler');
const errorResponse = require('../../../utils/errorResponse');
const successResponse = require('../../../utils/successResponse');
const db = require('../../../config/database.config');

const TransectionType = db.model.transectionType;

exports.create = async (req, res) => {
  try {
    const transectionTypeData = req.body;
    console.log(transectionTypeData);

    if (!transectionTypeData) {
      errorResponse(400, 'FAILED', 'Content can not be empty!', res);
    } else {
      const dataObj = {
        name: transectionTypeData.name,
        info: transectionTypeData.info,
        status: transectionTypeData.status,
      };

      const data = await TransectionType.create(dataObj);
      successResponse(201, 'OK', data, res);
    }
  } catch (err) {
    errorResponse(
      500,
      'ERROR',
      err.message || 'Some error occurred while creating the Transection Type.',
      res
    );
  }
};

exports.findAll = async (req, res) => {
  try {
    const query = await TransectionType.findAll();
    if (query.length > 0) {
      successResponse(200, 'OK', query, res);
    } else {
      res.send({ message: 'No Transection Type Found!' });
    }
  } catch (err) {
    errorResponse(
      500,
      'ERROR',
      err.message || 'Some error occurred while finding Transection Type.',
      res
    );
  }
};

exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);

    const data = await TransectionType.findByPk(id);

    if (data) {
      res.status(200).send({
        status: 'success',
        message: 'single Transection Type data',
        data: data,
      });
    } else {
      res.status(404).send({
        message: `Cannot find Transection Type with id=${id}.`,
      });
    }
  } catch (err) {
    errorResponse(
      500,
      'ERROR',
      err.message || 'Some error occurred while creating Transection Type.',
      res
    );
  }
};

exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const transectionTypeData = req.body;

    const query = await TransectionType.findByPk(id);

    if (query) {
      if (transectionTypeData?.name) {
        const updateDoc = {
          name: transectionTypeData.name,
          info: transectionTypeData.info,
          status: transectionTypeData.status,
        };
        const data = await TransectionType.update(updateDoc, {
          where: {
            id: id,
          },
        });
        res.status(200).send({
          status: 'success',
          message: 'Transection Type updated successfully',
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
        message: `Cannot find Transection Type with id=${req.params.id}.`,
      });
    }
  } catch (err) {
    errorResponse(
      500,
      'ERROR',
      err.message || 'Some error occurred while Updateing Transection Type',
      res
    );
  }
};

exports.delete = async (req, res) => {
  try {
    const id = req.params.id;

    const query = await TransectionType.findByPk(id);
    if (query) {
      const result = await TransectionType.destroy({
        where: {
          id: id,
        },
      });

      if (result === 1) {
        res.send({
          data: result,
          message: 'Transection Type deleted Successfully!',
        });
      }
    } else {
      res.send({
        message: `Cannot delete Transection Type with id=${id}. Maybe Transection Type was not found!`,
      });
    }
  } catch (err) {
    errorHandler(
      500,
      'ERROR',
      err.message || 'Some error occurred while Deleting Transection Type',
      res
    );
  }
};
