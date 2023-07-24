const errorResponse = require('../utils/errorResponse');
const db = require('../config/database.config');

const ROLES = db.model.ROLES;
const User = db.model.user;

checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Username Check
  User.findOne({ where: { username: req.body.username } }).then((user) => {
    if (user) {
      errorResponse(400, 'Failed', 'Username is already in use!', res);
      return;
    }

    // Email Check
    User.findOne({ where: { email: req.body.email } }).then((user) => {
      if (user) {
        errorResponse(400, 'Failed', 'Email is already in use!', res);
        return;
      }
      next();
    });
  });
};

checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        errorResponse(
          400,
          'Failed',
          'Role does not exist = ' + req.body.roles[i],
          res
        );
        return;
      }
    }
  }

  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
  checkRolesExisted: checkRolesExisted,
};

module.exports = verifySignUp;
