const { Router } = require("express");
const userRouter = Router();
const {userRegisterService,loginService}=require('./services')
userRouter.post('/register',userRegisterService);
userRouter.post('/login',loginService);

  module.exports=userRouter;
