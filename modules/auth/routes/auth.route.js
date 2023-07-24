const { verifySignUp } = require('../../../config/middleware.config');
const registrationController = require('../controllers/registration.auth.controller');
const loginController = require('../controllers/login.auth.controller');
const otpVerifyController = require('../controllers/otp.auth.controller');
const verifyMobileController = require('../controllers/verifyMobile.auth.controller');
const passwordController = require('../controllers/password.auth.controller');

module.exports = function (app) {
  // app.use(function(req, res, next) {
  //     res.header(
  //         "Access-Control-Allow-Headers",
  //         "x-access-token, Origin, Content-Type, Accept"
  //     );
  //     next();
  // });

  app.post('/api/user/signup', registrationController.signup);
  app.post('/api/user/signin', loginController.signin);
  app.post(
    '/api/user/verify-phonenumber',
    verifyMobileController.verifyMobileNumber
  );
  app.put('/api/user/password', passwordController.password);
  app.get('/api/user/otp-generate', otpVerifyController.otpGenerate);
};
