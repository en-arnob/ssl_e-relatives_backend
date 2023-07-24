const errorHandler = require('../../../utils/errorHandler');
const errorResponse = require('../../../utils/errorResponse');
const successResponse = require('../../../utils/successResponse');
const db = require('../../../config/database.config');

const HeadIdentifier = db.model.headIdentifier;

exports.create = async (req, res) => {
  try {
    const headIdentifierData = req.body;
    console.log(headIdentifierData);

    if (!headIdentifierData) {
      errorResponse(400, 'FAILED', 'Content can not be empty!', res);
    } else {
      const dataObj = {
        name: headIdentifierData.name,
        info: headIdentifierData.info,
        status: headIdentifierData.status,
      };

      const data = await HeadIdentifier.create(dataObj);
      successResponse(201, 'OK', data, res);
    }
  } catch (err) {
    errorResponse(
      500,
      'ERROR',
      err.message || 'Some error occurred while creating the Head Identifier.',
      res
    );
  }
};

exports.findAll = async (req, res) => {
  try {
    const query = await HeadIdentifier.findAll();
    if (query.length > 0) {
      successResponse(200, 'OK', query, res);
    } else {
      res.send({ message: 'No Head Identifier Found!' });
    }
  } catch (err) {
    errorResponse(
      500,
      'ERROR',
      err.message || 'Some error occurred while finding Head Identifier.',
      res
    );
  }
};

exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);

    const data = await HeadIdentifier.findByPk(id);

    if (data) {
      res.status(200).send({
        status: 'success',
        message: 'single Head Identifier data',
        data: data,
      });
    } else {
      res.status(404).send({
        message: `Cannot find Head Identifier with id=${id}.`,
      });
    }
  } catch (err) {
    errorResponse(
      500,
      'ERROR',
      err.message || 'Some error occurred while creating the Head Identifier.',
      res
    );
  }
};

exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const headIdentifierData = req.body;

    const query = await HeadIdentifier.findByPk(id);

    if (query) {
      if (headIdentifierData?.name) {
        const updateDoc = {
          name: headIdentifierData.name,
          info: headIdentifierData.info,
          status: headIdentifierData.status,
        };
        const data = await HeadIdentifier.update(updateDoc, {
          where: {
            id: id,
          },
        });
        res.status(200).send({
          status: 'success',
          message: 'Head Identifier updated successfully',
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
        message: `Cannot find Head Identifier with id=${req.params.id}.`,
      });
    }
  } catch (err) {
    errorResponse(
      500,
      'ERROR',
      err.message || 'Some error occurred while Updateing Head Identifier',
      res
    );
  }
};

exports.delete = async (req, res) => {
  try {
    const id = req.params.id;

    const query = await HeadIdentifier.findByPk(id);
    if (query) {
      const result = await HeadIdentifier.destroy({
        where: {
          id: id,
        },
      });

      if (result === 1) {
        res.send({
          data: result,
          message: 'Head Identifier deleted Successfully!',
        });
      }
    } else {
      res.send({
        message: `Cannot delete Head Identifier with id=${id}. Maybe Head Identifier was not found!`,
      });
    }
  } catch (err) {
    errorHandler(
      500,
      'ERROR',
      err.message || 'Some error occurred while Deleting Head Identifier',
      res
    );
  }
};
