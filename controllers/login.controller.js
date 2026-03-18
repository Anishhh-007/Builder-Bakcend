const userModel = require("../models/user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const loginController = async (req, res) => {
    try {
        const { username, password } = req.body
        if (!username || !password) {
            return res.status(401).send("Credentials are needed")
        }
        const isUser = await userModel.findOne({
            username
        }).select("+password")


        if (!isUser) {
            return res.status(409).send("User doesnot exist")
        }
        const isPass = await bcrypt.compare(password, isUser.password)

        if (!isPass) {
            return res.status(409).send("User doesnot exist")
        }

        const loginUser = await userModel.findOne({
            username
        })
        token = jwt.sign({ userId: loginUser._id }, process.env.JET_SECRET, { expiresIn: "1d" })
        res.cookie  ("token", token)
        res.status(201).send(loginUser)
    } catch (error) {
        res.status(400).send(error.message)
    }
}


module.exports = loginController