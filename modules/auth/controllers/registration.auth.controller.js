const errorResponse = require("../../../utils/errorResponse");
const successResponse = require("../../../utils/successResponse");
var bcrypt = require("bcryptjs");

const db = require("../../../config/database.config");
const User = db.model.user;

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
        const registrationNo = Math.floor(
          1000000000 +
            Math.random() *
              9000000000 *
              Math.floor(1000000000 + Math.random() * 9000000000 * Date.now())
        )
          .toString()
          .substring(2, 10);

        const dataObj = {
          role_id: userData.role_id ? userData.role_id : 4,
          registration_no: registrationNo,
          f_name: userData.f_name,
          l_name: userData.l_name,
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
        // console.log(data);

        return successResponse(201, "OK", data, res);
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
