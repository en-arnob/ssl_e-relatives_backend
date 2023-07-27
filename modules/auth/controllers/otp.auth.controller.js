require("dotenv").config();
const db = require("../../../config/database.config");
const errorResponse = require("../../../utils/errorResponse");
const successResponse = require("../../../utils/successResponse");
var jwt = require("jsonwebtoken");
const axios = require("axios");

const User = db.model.user;
// const Role = db.model.role;
// const Op = db.DataTypes.Op;

exports.otpGenerate = async (req, res) => {
  try {
    const otp = Math.floor(100000 + Math.random() * 900000);
    console.log(otp);

    return res.status(200).send({
      status: "1",
      message: "OTP Generate Successfully",
      // token: token,
      data: otp,
    });
  } catch (err) {
    errorResponse(
      500,
      "ERROR",
      err.message || "Some error occurred while creating the User.",
      res
    );
  }
};

exports.otpSend = async (req, res) => {
  const mobile = req.params.mobile;
  try {
    const otp = Math.floor(100000 + Math.random() * 900000);
    console.log(otp);
    const find = await User.findOne({
      where: { mobile: mobile },
    });
    // console.log(find);
    if (!find) {
      return res.status(404).send({
        status: "0",
        message: "User not found",
        data: [],
      });
    } else {
      const userUpdate = await User.update(
        {
          user_otp: otp,
          otp_verified: 0,
        },
        {
          where: {
            mobile: mobile,
          },
        }
      );
      if (userUpdate) {
        const message = `Dear ${find.f_name}, Please confirm Your OTP: ${otp} in the browser to continue password reset.`;
        const sms = await axios.post(
          `https://api.greenweb.com.bd/api.php?token=97351551401689673900003da986f5a5f7647b72309c70b65dae&to=${mobile}&message=${message}`
        );
        // console.log(sms.status);

        if (sms.status === 200) {
          return res.status(200).send({
            message: "OTP Sent Successfully",
          });
        } else {
          return res.status(400).send({
            message: "OTP Send Error!",
            data: [],
          });
        }
      }
    }
  } catch (err) {
    errorResponse(
      500,
      "ERROR",
      err.message || "Some error occurred while creating the User.",
      res
    );
  }
};
