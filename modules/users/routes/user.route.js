const userRouter = require('express').Router();
const userController = require('../controllers/user.controller');
const userPhotoUploadMulter = require('../../../middlewares/uploadUserPhoto');
const verifyJwtToken = require('../../../middlewares/authJwt');

module.exports = (app) => {
  userRouter.get(
    '/all-users',
    // verifyJwtToken.verifyToken,
    userController.findAll
  );
  userRouter.get('/user/:id', userController.findOne);
  userRouter.get('/birthday-report', userController.findAllByBirthdayRange);
  userRouter.put('/user/:id', userController.update);
  userRouter.delete('/user/:id', userController.delete);
  userRouter.post(
    '/user/upload-image',
    userPhotoUploadMulter,
    userController.uploadImage
  );

  app.use('/api/users', userRouter);
};
