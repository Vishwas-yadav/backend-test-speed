const { Router } = require("express");
const adminRouter = Router();
const {setLimitService,getOverSpeedUSersService,deleteOldSpeedingRecordsService}=require('./services')
adminRouter.post('/setlimit',setLimitService);
adminRouter.get('/speedingusers',getOverSpeedUSersService);
adminRouter.get('/deleteoldrecords',deleteOldSpeedingRecordsService);

module.exports=adminRouter;
