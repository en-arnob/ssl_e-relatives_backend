const drugRouter = require('express').Router();
const drugController = require('../controllers/drug.controller');


module.exports = (app) => {
  drugRouter.post('/create-drug', drugController.create);
  drugRouter.get('/all-drugs', drugController.findAll);
  drugRouter.get('/drug/:id', drugController.findOne);
  drugRouter.put('/drug/:id', drugController.update);
  drugRouter.delete('/drug/:id', drugController.delete);

  app.use('/api/drugs', drugRouter);
};
