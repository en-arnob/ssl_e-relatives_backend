const headClassificationRouter = require('express').Router();
const headClassificationController = require('../controllers/headClassification.controller');


module.exports = (app) => {
  headClassificationRouter.post('/create', headClassificationController.create);
  headClassificationRouter.get('/all', headClassificationController.findAll);
  headClassificationRouter.get('/:id', headClassificationController.findAllClassificationById);
  headClassificationRouter.put('/:id', headClassificationController.update);
  headClassificationRouter.delete('/:id', headClassificationController.delete);

  app.use('/api/head-classification', headClassificationRouter);
};
