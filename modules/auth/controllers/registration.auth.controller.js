const errorResponse = require("../../../utils/errorResponse");
const axios = require("axios");
const successResponse = require("../../../utils/successResponse");
var bcrypt = require("bcryptjs");

const db = require("../../../config/database.config");
const User = db.model.user;
const UserDetails = db.model.UserDetails;

exports.signup = async (req, res) => {
  try {
    const userData = req.body;

    if (!userData) {
      errorResponse(400, "FAILED", "Content can not be empty!", res);
    } else {
      const query = await User.findOne({ where: { mobile: userData.mobile } });

      if (query) {
        res.send({
          status: "FAILD",
          message: "User Already Created Using This Mobile Number",
        });
      } else {
        // const registrationNo = Math.floor(
        //   1000000000 +
        //     Math.random() *
        //       9000000000 *
        //       Math.floor(1000000000 + Math.random() * 9000000000 * Date.now())
        // )
        //   .toString()
        //   .substring(2, 10);

        const highestRegNo = await User.max("registration_no");
        const registrationNo = highestRegNo + 1;

        const initialOTP = Math.floor(100000 + Math.random() * 900000);

        const dataObj = {
          role_id: userData.role_id,
          service_category_id: userData.service_category_id,
          registration_no: registrationNo,
          user_otp: initialOTP,
          f_name: userData.name,
          username: userData.userName,
          mobile: userData.mobile,
          password: bcrypt.hashSync(userData.password, 8),
          email: userData.email,
          date_of_birth: userData.date_of_birth,
          contact_person: userData.contactPerson,
          nid: userData.nid,
          credit_limit: userData.credit_limit,
          commission_rate: userData.commission_rate,
          address_1: userData.address1,
          address_2: userData.address2,
          remarks: userData.remarks,
          image: userData.image,
          finger_print: userData.finger_print,
          status: userData.status,
        };

        // res.send(dataObj)

        const data = await User.create(dataObj);
        const details = await UserDetails.create({
          user_id: data.id,
          blood_group: userData.bloodGroup,
          dghs_license: userData.dghsLicense,
        });
        // console.log(data);
        // const message = `Dear ${data.f_name}, Please confirm Your OTP: ${initialOTP} in the browser to continue registration.`;

        // const sms = await axios.post(
        //   `https://api.greenweb.com.bd/api.php?token=97351551401689673900003da986f5a5f7647b72309c70b65dae&to=${data.mobile}&message=${message}`
        // );
        // const dataForClient = {
        //   mobile: data.mobile,
        //   name: data.f_name,
        // };

        // if (sms.status === 200) {
        //   return successResponse(201, "OK", dataForClient, res);
        // }
        if (details) {
          successResponse(201, "OK", details, res);
        }
      }
    }
    // successResponse(201, 'OK', data, res);
  } catch (err) {
    errorResponse(
      500,
      "ERROR",
      err.message || "Some error occurred while creating the User.",
      res
    );
  }
};

exports.confirmOTP = async (req, res) => {
  const mobile = req.params.mobile;
  const otp = req.params.otp;
  try {
    const find = await User.findOne({
      where: {
        mobile: mobile,
        user_otp: otp,
      },
    });
    if (!find) {
      return res.status(400).send({
        message: "OTP not matched !",
        data: [],
      });
    } else {
      const userUpdate = await User.update(
        {
          otp_verified: 1,
        },

        {
          where: {
            mobile: mobile,
          },
        }
      );
      if (userUpdate) {
        return res.status(200).send({
          message: "Confirmed Successfully",
          data: userUpdate,
        });
      } else {
        return res.status(400).send({
          message: "Password Change Error !",
          data: [],
        });
      }
    }
  } catch (error) {
    res.status(500).send({
      message: error.message,
      data: [],
    });
  }
};
