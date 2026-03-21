const userModel = require("../models/user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const loginController = async (req, res) => {
    try {
        const { username, password } = req.body

        if (!username || !password) {
            return res.status(400).send("Credentials are needed")
        }

        const isUser = await userModel.findOne({ username }).select("+password")

        if (!isUser) {
            return res.status(401).send("Invalid credentials")
        }

        const isPass = await bcrypt.compare(password, isUser.password)

        if (!isPass) {
            return res.status(401).send("Invalid credentials")
        }

        const loginUser = await userModel.findOne({ username })

        const token = jwt.sign(
            { userId: loginUser._id },
            process.env.JET_SECRET,
            { expiresIn: "7d" }
        )

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.status(200).json(loginUser)
    } catch (error) {
        return res.status(500).send(error.message)
    }
}


module.exports = loginController