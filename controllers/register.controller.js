const userModel = require("../models/user.model")
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")


const registerController = async (req, res) => {
    try {

        const { name, username, password } = req.body

        if (!name || !username || !password) {
         return res.status(401).send("Credentials are needed")

        }


        const hash = await bcrypt.hash(password, 10)

        const isUser = await userModel.findOne({
            username
        })

        if (isUser) {
            return res.status(409).send("User already exists")
        }

        const registerUser = await userModel.create({
            name,
            username,
            password: hash
        })
        token = jwt.sign({ userId: registerUser._id }, process.env.JET_SECRET, { expiresIn: "1d" })
        res.cookie ("token", token)
        res.status(201).send(registerUser)

    } catch (error) {
        res.status(401).send(error.message)
    }
}

module.exports = registerController