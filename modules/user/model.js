const { Schema, model } = require("mongoose");
const loginSchema = Schema({
    name:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    role:{
        type:String
    }
});

    const user = model("user", loginSchema);
    module.exports = user;