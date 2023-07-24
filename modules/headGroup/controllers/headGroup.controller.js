const db = require('../../../config/database.config');
const errorResponse = require('../../../utils/errorResponse');
const successResponse = require('../../../utils/successResponse');

const HeadClassification = db.model.headClassification;
const HeadIdentifier = db.model.headIdentifier;
const HeadGroup = db.model.headGroup;

exports.create = async (req, res) => {
  try {
    const headGroupData = req.body;
    console.log(headGroupData);

    if (!headGroupData) {
      errorResponse(400, 'FAILED', 'Content can not be empty!', res);
    } else {
      const dataObj = {
        identifier_id: headGroupData.identifier_id,
        classification_id: headGroupData.classification_id,
        name: headGroupData.name,
        info: headGroupData.info,
        status: headGroupData.status,
      };

      const data = await HeadGroup.create(dataObj);
      successResponse(201, 'OK', data, res);
    }
  } catch (err) {
    errorResponse(
      500,
      'ERROR',
      err.message || 'Some error occurred while creating Head Group.',
      res
    );
  }
};

exports.findAll = async (req, res) => {
  try {
    const data = await HeadGroup.findAll({
      include: [
        {
          model: HeadIdentifier,
          attributes: ['name', 'info'],
        },
        {
          model: HeadClassification,
          attributes: ['name', 'info'],
        },
      ],
    });

    if (data.length > 0) {
      successResponse(200, 'OK', data, res);
    } else {
      res.send({ message: 'No Head Group Found!' });
    }
  } catch (err) {
    errorResponse(
      500,
      'ERROR',
      err.message || 'Some error occurred while creating Head Group',
      res
    );
  }
};

exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);

    const data = await HeadGroup.findOne({
      where: {
        id: id,
      },
      include: [
        {
          model: HeadIdentifier,
          attributes: ['name', 'info'],
        },
        {
          model: HeadClassification,
          attributes: ['name', 'info'],
        },
      ],
    });

    if (data) {
      res.status(200).send({
        status: 'success',
        message: 'single Head Group data',
        data: data,
      });
    } else {
      res.status(404).send({
        message: `Cannot find Head Group with id=${id}.`,
      });
    }
  } catch (err) {
    errorResponse(
      500,
      'ERROR',
      err.message || 'Some error occurred while creating Head Group',
      res
    );
  }
};

exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const headGroupData = req.body;

    const query = await HeadGroup.findByPk(id);

    if (query) {
      if (
        headGroupData?.name &&
        headGroupData?.identifier_id &&
        headGroupData?.classification_id
      ) {
        const updateDoc = {
          name: headGroupData.name,
          info: headGroupData.info,
          identifier_id: headGroupData.identifier_id,
          classification_id: headGroupData.classification_id,
          status: headGroupData.status,
        };

        const data = await HeadGroup.update(updateDoc, {
          where: {
            id: id,
          },
        });
        res.status(200).send({
          status: 'success',
          message: 'Head Group updated successfully',
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
        message: `Cannot find Head Group with id=${req.params.id}.`,
      });
    }
  } catch (err) {
    errorResponse(
      500,
      'ERROR',
      err.message || 'Some error occurred while creating Head Group',
      res
    );
  }
};

exports.delete = async (req, res) => {
  try {
    const id = req.params.id;

    const query = await HeadGroup.findByPk(id);
    if (query) {
      const result = await HeadGroup.destroy({
        where: {
          id: id,
        },
      });

      res.send({
        data: result,
        message: 'Head Group deleted Successfully!',
      });
    } else {
      res.send({
        message: `Cannot delete Head Group with id=${id}. Maybe Head Group was not found!`,
      });
    }
  } catch (err) {
    errorHandler(
      500,
      'ERROR',
      err.message ||
        'Some error occurred while creating the Head Group.',
      res
    );
  }
};
