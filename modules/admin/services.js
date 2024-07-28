const limit=require('./model');
const speedingUsersForAdmin=require('./model2');
const setLimitService=async(req,res)=>{
try {
    const {speedLimit,vehicleType}=req.body;
    console.log("Here::",req.body);
    const newLimits = await limit.findOneAndUpdate(
        { vehicleType },
        { speedLimit },
        { new: true } // To return the updated document
      );
      if(!newLimits){
        const newLimit = new limit({ vehicleType:vehicleType,
        speedLimit:speedLimit });
        await newLimit.save();
      }
      const data = {
        msg: "speed Updated successfully!"
    }
    res.status(200).json(data);
    return null;
} catch (error) {
    console.log("Error in setLimitService:", error);
    res.status(400).json(error);
    return null;
}
}


const getOverSpeedUSersService = async (req, res) => {
  try {
    const allOverSpeedingUsers = await speedingUsersForAdmin.aggregate([
      {
        $group: {
          _id: "$userId",
          records: { $push: "$$ROOT" }
        }
      }
    ]);
    console.log("over all:::",allOverSpeedingUsers);
    const data = {
      msg: "data of over speeding users.",
      data: allOverSpeedingUsers
    };
    res.status(200).json(data);
    return null;
  } catch (error) {
    console.log("Error in getOverSpeedUSersService:", error);
    res.status(400).json(error);
    return null;
  }
}

const deleteOldSpeedingRecordsService = async (req, res) => {
  try {
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

    const result = await speedingUsersForAdmin.deleteMany({
      timestamp: { $lt: threeDaysAgo }
    });

    console.log(result);

    const data = {
      msg: "Old speeding records deleted successfully!",
      deletedCount: result.deletedCount
    };
    res.status(200).json(data);
    return null;
  } catch (error) {
    console.log("Error in deleteOldSpeedingRecordsService:", error);
    res.status(400).json(error);
    return null;
  }
}

module.exports={
    setLimitService,
    getOverSpeedUSersService,
    deleteOldSpeedingRecordsService
}