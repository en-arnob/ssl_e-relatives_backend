const headIdentifierRouter = require('express').Router();
const headIdentifierController = require('../controllers/headIdentifier.controller');

module.exports = (app) => {
  headIdentifierRouter.post('/create', headIdentifierController.create);
  headIdentifierRouter.get('/all', headIdentifierController.findAll);
  headIdentifierRouter.get('/:id', headIdentifierController.findOne);
  headIdentifierRouter.put('/:id', headIdentifierController.update);
  headIdentifierRouter.delete('/:id', headIdentifierController.delete);

  app.use('/api/head-identifier', headIdentifierRouter);
};
