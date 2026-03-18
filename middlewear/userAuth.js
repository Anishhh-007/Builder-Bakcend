const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken")

const userAuth = async (  req ,res , next) => {
    try {
        const {token} = req.cookies;
        if(!token) {
            return res.status(401).send("Authentication token missing")
        }
        
            const decoded = jwt.verify(token, process.env.JET_SECRET);

             const user = await userModel.findById (decoded.userId)
              req.data = user
             next()
        
    } catch (error) {
        res.status(401).send(error.message)
    }
}

module.exports = userAuth