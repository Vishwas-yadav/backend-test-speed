const { Schema, model } = require("mongoose");
const locationForSpeedingSchema = Schema({
    userId: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    vehicleNo: {
      type: String,
      required: true
    },
    vehicleType: {
      type: String,
      required: true
    },
    speed: {
      type: Number,
      required: true
    },
    location: {
      lat: {
        type: Number,
        required: true
      },
      lng: {
        type: Number,
        required: true
      }
    },
    timestamp: {
      type: Date,
      default: Date.now
    }
  });

    const speedingLoc = model("speedexceed", locationForSpeedingSchema);
    module.exports = speedingLoc;