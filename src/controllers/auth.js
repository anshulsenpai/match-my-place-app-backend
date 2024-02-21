const User = require("../models/user")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

async function handleRegister(req, res) {
    try {
        const { firstName, lastname, username, gender, email, password, phone, profile, serType
        } = req.body

        if (firstName && lastname && username && email && password && phone) {
            const user = new User({ firstName, lastname, username, gender, email, password, phone, profile, serType })
            const result = await user.save()
            console.log("User created")
            res.status(201).json({ status: 201, message: "User created" })
        } else {
            console.log("Error in user register")
            res.status(500).json({ status: 500, message: "please provide all required details" })
        }
    } catch (error) {
        console.log("Error in user register")
        res.status(500).json({ status: 500, message: error.message })
    }
}

async function handleLogin(req, res) {

    try {
        // check if user exist
        const user = await User.findOne({ username: req.body.username })
        if (!user) {
            res.status(404).json({ status: 404, message: "User not found" })
            return
        }
        const checkpass = await bcrypt.compare(req.body.password, user.password)

        if (!checkpass) {
            res.status(500).json({ status: 500, message: "Invalid username or password" })
            return
        }

        const token = jwt.sign(
            {
                id: user._id,
            },
            process.env.JWT_SEC_KEY,
            { expiresIn: "15d" }
        );
        const { password, ...other } = user._doc;
        res.status(200).json({ status: 200, data: { ...other, token } });
    } catch (error) {
        console.log(error)
        res.status(500).json({ status: 500, message: error.message })
    }
}


module.exports = {
    handleRegister, handleLogin
}