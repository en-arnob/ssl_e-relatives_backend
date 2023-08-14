const reqForTestRouter=require('express').Router();
const reqForTestController=require('../controllers/reqForTest.controller');
module.exports= (app)=>{

    reqForTestRouter.get('/',reqForTestController.getAllName);
    app.use('/api/services/req-for-test',reqForTestRouter);
}