const speedingLoc = require('./model');
const limit = require('../admin/model');
const speedingUsersForAdmin=require('../admin/model2');
const recurringLocFromUserService = async (req, res) => {
    try {
        const { name, speed, timestamp, userId, vehicleNo, vehicleType, location } = req.body;
        if (!name || !timestamp || !userId || !vehicleNo || !vehicleType || !location) {
            throw {
                err: "Params missing!"
            }
        }
        console.log(name, speed, timestamp, userId, vehicleNo, vehicleType, location);
        const { speedLimit } = await limit.findOne({ vehicleType: vehicleType });
        console.log("speedLimit", speedLimit);


        if (speed > speedLimit) {

            const exceedData = await speedingLoc.find({ userId: userId });
            console.log("exceedDataexceedData::",exceedData.length);
            if (exceedData.length==0) {
                const newEntry = new speedingLoc({
                    userId: userId,
                    name: name,
                    vehicleNo: vehicleNo,
                    vehicleType: vehicleType,
                    speed: speed,
                    location: location,
                    timestamp: timestamp,
                });
                await newEntry.save();
            }else{
                const lastRecord = exceedData[0];
                const lastTimestamp = new Date(lastRecord.timestamp);
                const currentTimestamp = new Date(timestamp);
                const timeDifference = (currentTimestamp - lastTimestamp) / 1000; // time difference in seconds

                if (timeDifference <= 20) {
                    console.log("Speed limit exceeded multiple times before");
                    //insert into new db for admin.
                    const newEntryForAdmin = new speedingUsersForAdmin({
                        userId: userId,
                        name: name,
                        vehicleNo: vehicleNo,
                        vehicleType: vehicleType,
                        speed: speed,
                        location: location,
                        timestamp: timestamp,
                    });
                    await newEntryForAdmin.save();
                    await speedingLoc.deleteMany({ userId: userId });
                } else {
                    console.log("Not recently exceeded");
                    await speedingLoc.deleteMany({ userId: userId });
                }
                const newEntry = new speedingLoc({
                    userId: userId,
                    name: name,
                    vehicleNo: vehicleNo,
                    vehicleType: vehicleType,
                    speed: speed,
                    location: location,
                    timestamp: timestamp,
                });
                await newEntry.save();
            }
        } else {
            console.log("Normal Speed");
        }
        const data = {
            msg: "okay!"
        }
        res.status(200).json(data);
        return null;
    } catch (error) {
        console.log("Error in Recurring Loc From User Service:", error);
        res.status(400).json(error);
        return null;
    }
}

module.exports = {
    recurringLocFromUserService
}