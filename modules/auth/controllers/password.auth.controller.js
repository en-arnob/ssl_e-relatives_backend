const errorResponse = require('../../../utils/errorResponse');
const successResponse = require('../../../utils/successResponse');
const bcrypt = require('bcryptjs');

const db = require('../../../config/database.config');
const User = db.model.user;

exports.password = async (req, res) => {
  const userInfo = req.body;
  console.log(userInfo);
  try {
    const user = await User.findOne({
      where: {
        mobile: userInfo.mobile,
      },
    });

    if (user) {
      const newPassword = userInfo.newPassword;
      const confirmPassword = userInfo.confirmPassword;

      if (newPassword === confirmPassword) {
        const userUpdate = await User.update(
          {
            password: bcrypt.hashSync(userInfo.confirmPassword, 10),
          },

          {
            where: {
              mobile: userInfo.mobile,
            },
          }
        );

        if (userUpdate) {
          return res.status(200).send({
            status: '1',
            message: 'Password Change Successfully',
            data: user,
          });
        } else {
          return res.status(400).send({
            status: '0',
            message: 'Password Change Error !',
            data: [],
          });
        }
      } else {
        return res.status(400).send({
          status: '0',
          message: 'Password Does not Match !',
          data: [],
        });
      }
    } else {
      return res.status(400).send({
        status: '0',
        message: 'User Not Found',
        data: [],
      });
    }
  } catch (error) {
    res.status(500).send({
      status: '0',
      message: error.message,
      data: [],
    });
  }
};
