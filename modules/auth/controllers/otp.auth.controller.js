require('dotenv').config();
const db = require('../../../config/database.config');
const errorResponse = require('../../../utils/errorResponse');
const successResponse = require('../../../utils/successResponse');
var jwt = require('jsonwebtoken');

const User = db.model.user;
// const Role = db.model.role;
// const Op = db.DataTypes.Op;

exports.otpGenerate = async (req, res) => {
  try {
    const otp = Math.floor(100000 + Math.random() * 900000);
    // console.log(otp);

    return res.status(200).send({
      status: '1',
      message: 'OTP Generate Successfully',
      // token: token,
      data: otp,
    });
  } catch (err) {
    errorResponse(
      500,
      'ERROR',
      err.message || 'Some error occurred while creating the User.',
      res
    );
  }
};
