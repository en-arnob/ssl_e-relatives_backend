const transectionTypeRouter = require('express').Router();
const transectionTypeController = require('../controllers/transectionType.controller');

module.exports = (app) => {
  transectionTypeRouter.post('/create', transectionTypeController.create);
  transectionTypeRouter.get('/all', transectionTypeController.findAll);
  transectionTypeRouter.get('/:id', transectionTypeController.findOne);
  transectionTypeRouter.put('/:id', transectionTypeController.update);
  transectionTypeRouter.delete('/:id', transectionTypeController.delete);

  app.use('/api/transection-type', transectionTypeRouter);
};
