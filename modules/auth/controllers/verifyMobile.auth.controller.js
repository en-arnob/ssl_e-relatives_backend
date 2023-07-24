const errorResponse = require('../../../utils/errorResponse');
const successResponse = require('../../../utils/successResponse');

const db = require('../../../config/database.config');
const User = db.model.user;

exports.verifyMobileNumber = async (req, res) => {
  try {
    const mobileNumber = req.body;
    console.log(mobileNumber.mobile);

    if (!mobileNumber.mobile) {
      return errorResponse(400, 'FAILED', 'Field can not be empty!', res);
    } else {
      const userQuery = await User.findOne({
        where: { mobile: mobileNumber.mobile },
      });
      if (!userQuery) {
        return res.status(404).send({
          status: '0',
          message: 'User Mobile Number Not found!!',
          data: [],
        });
      } else {
        return res.status(200).send({
          status: '1',
          message: 'Mobile Number found!',
          data: userQuery,
        });
      }
    }
  } catch (err) {
    errorResponse(
      500,
      'ERROR',
      err.message || 'Some error occurred while Finding User Mobile',
      res
    );
  }
};
