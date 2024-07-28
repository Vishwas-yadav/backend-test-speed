const { Schema, model } = require("mongoose");
const overSpeedingUsers = Schema({
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

    const speedingUsersForAdmin = model("overspeedingusers", overSpeedingUsers);
    module.exports = speedingUsersForAdmin;