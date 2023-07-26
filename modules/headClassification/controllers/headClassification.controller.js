const db = require('../../../config/database.config');
const errorResponse = require('../../../utils/errorResponse');
const successResponse = require('../../../utils/successResponse');

const HeadClassification = db.model.headClassification;
const HeadIdentifier = db.model.headIdentifier;

exports.create = async (req, res) => {
  try {
    const headClassificationData = req.body;
    // console.log(headClassificationData);

    if (!headClassificationData) {
      errorResponse(400, 'FAILED', 'Content can not be empty!', res);
    } else {
      const dataObj = {
        name: headClassificationData.name,
        info: headClassificationData.info,
        identifier_id: headClassificationData.identifier_id,
        status: headClassificationData.status,
      };

      const data = await HeadClassification.create(dataObj);
      successResponse(201, 'OK', data, res);
    }
  } catch (err) {
    errorResponse(
      500,
      'ERROR',
      err.message || 'Some error occurred while creating Head Classification.',
      res
    );
  }
};

exports.findAll = async (req, res) => {
  try {
    const data = await HeadClassification.findAll({
      include: [
        {
          model: HeadIdentifier,
          attributes: ['name', 'info'],
        },
      ],
    });

    if (data.length > 0) {
      successResponse(200, 'OK', data, res);
    } else {
      res.send({ message: 'No Head Classification Found!' });
    }
  } catch (err) {
    errorResponse(
      500,
      'ERROR',
      err.message || 'Some error occurred while creating Head Classification',
      res
    );
  }
};

exports.findAllClassificationById = async (req, res) => {
  try {
    const identifier_id = req.params.id;
    console.log(identifier_id);

    const data = await HeadClassification.findAll({
      where: {
        identifier_id: identifier_id,
      },
      include: [
        {
          model: HeadIdentifier,
          attributes: ['name', 'info'],
        },
      ],
    });

    if (data) {
      res.status(200).send({
        status: 'success',
        message: 'single Head Classification data',
        data: data,
      });
    } else {
      res.status(404).send({
        message: `Cannot find Head Classification with id=${ identifier_id}.`,
      });
    }
  } catch (err) {
    errorResponse(
      500,
      'ERROR',
      err.message || 'Some error occurred while creating Head Classification',
      res
    );
  }
};

exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const headClassificationData = req.body;

    const query = await HeadClassification.findByPk(id);

    if (query) {
      if (
        headClassificationData?.name &&
        headClassificationData?.identifier_id
      ) {
        const updateDoc = {
          name: headClassificationData.name,
          info: headClassificationData.info,
          identifier_id: headClassificationData.identifier_id,
          status: headClassificationData.status,
        };

        const data = await HeadClassification.update(updateDoc, {
          where: {
            id: id,
          },
        });
        res.status(200).send({
          status: 'success',
          message: 'Head Classification updated successfully',
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
        message: `Cannot find Head Classification with id=${req.params.id}.`,
      });
    }
  } catch (err) {
    errorResponse(
      500,
      'ERROR',
      err.message || 'Some error occurred while creating Head Classification',
      res
    );
  }
};

exports.delete = async (req, res) => {
  try {
    const id = req.params.id;

    const query = await HeadClassification.findByPk(id);
    if (query) {
      const result = await HeadClassification.destroy({
        where: {
          id: id,
        },
      });

      res.send({
        data: result,
        message: 'Head Classification deleted Successfully!',
      });
    } else {
      res.send({
        message: `Cannot delete Head Classification with id=${id}. Maybe Head Classification was not found!`,
      });
    }
  } catch (err) {
    errorHandler(
      500,
      'ERROR',
      err.message ||
        'Some error occurred while creating the Head Classification.',
      res
    );
  }
};
