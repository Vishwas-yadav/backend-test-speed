const { Schema, model } = require("mongoose");
const speedLimitSchema = Schema({
    vehicleType:{
        type: String,
        required: true
    },
    speedLimit: {
        type: Number,
        required: true
    }
});

    const limit = model("speedlimit", speedLimitSchema);
    module.exports = limit;