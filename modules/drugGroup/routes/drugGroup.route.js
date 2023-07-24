const drugGroupRouter = require('express').Router();
const drugGroupController = require('../controllers/drugGroup.controller');

module.exports = (app) => {
  drugGroupRouter.post('/create-group', drugGroupController.create);
  drugGroupRouter.get('/all-groups', drugGroupController.findAll);
  drugGroupRouter.get('/group/:id', drugGroupController.findOne);
  drugGroupRouter.put('/group/:id', drugGroupController.update);
  drugGroupRouter.delete('/group/:id', drugGroupController.delete);

  app.use('/api/drug-groups', drugGroupRouter);
};
