const user = require('./model');
const Promise = require("bluebird");
const bcrypt = Promise.promisifyAll(require("bcryptjs"));
const jwt = require('jsonwebtoken');
const userRegisterService = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        if (!email || !password || !name) {
            throw {
                err: "Registration params missing!"
            }
        }
        const anyUser = await user.findOne({ email: email });
        if (anyUser) {
            throw {
                err: "Email already registered!"
            }
        }
        const newUserObj = new user({
            email: email,
            password: password,
            name:name,
            role: role ? role : 'user'
        });
        console.log("save obj before hash:", newUserObj);
        //hashing...
        const salt = await bcrypt.genSalt(10);
        const hashPasswordVal = await bcrypt.hash(newUserObj.password, salt);
        newUserObj.password = hashPasswordVal;


        console.log("save obj after hash:", newUserObj);

        await newUserObj.save();
        const data = {
            msg: "User registerd successfully!"
        }
        res.status(200).json(data);
        return null;
    } catch (error) {
        console.log("Error in Register User Service:", error);
        res.status(400).json(error);
        return null;
    }
}
const loginService = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            throw {
                err: "Login params missing!"
            }
        }
        const fetchUser = await user.findOne({ email: email });
        if (!fetchUser) {
            throw {
                err: "No User Found: Email not registered!"
            }
        }
        const isMatched = await bcrypt.compare(password, fetchUser.password);
        if (isMatched) {
            const payload = {
                email: fetchUser.email,
                role: fetchUser.role,
                name:fetchUser.name,
                user_id: fetchUser._id
            };
            console.log(payload);
            // Generate JWT token
            const secret = process.env.SECRETE_JWT_KEY;
            const token = jwt.sign(payload, secret);
            const data = {
                msg: "login successfull!",
                token: token
            }
            res.status(200).json(data);
            return null;
        } else {
            throw {
                err: 'PASSWORD INCORRECT!'
            }
        }


    } catch (error) {
        console.log("Error in Login User Service:", error);
        res.status(401).json(error);
        return null;
    }


};
module.exports = {
    userRegisterService,
    loginService
}