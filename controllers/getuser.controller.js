const userModel = require("../models/user.model")

const getUserController = async (req , res) => {
    try {
        const user = req.data
        const getUser = await userModel.findOne({
            _id : user.id
        })
        if(!getUser) return res.status(401).send("User not available")
        res.status(200).send(getUser)
    } catch (error) {
        res.status(401).send(error.message)
    }
}

module.exports = getUserController