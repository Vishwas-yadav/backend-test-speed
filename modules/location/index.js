const { Router } = require("express");
const locationRouter = Router();
const {recurringLocFromUserService}=require('./services')
locationRouter.post('/recurring',recurringLocFromUserService);

module.exports=locationRouter;
