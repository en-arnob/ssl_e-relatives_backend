const headGroupRouter = require('express').Router();
const headGroupController = require('../controllers/headGroup.controller');


module.exports = (app) => {
  headGroupRouter.post('/create', headGroupController.create);
  headGroupRouter.get('/all', headGroupController.findAll);
  headGroupRouter.get('/:id', headGroupController.findOne);
  headGroupRouter.put('/:id', headGroupController.update);
  headGroupRouter.delete('/:id', headGroupController.delete);

  app.use('/api/head-group', headGroupRouter);
};
