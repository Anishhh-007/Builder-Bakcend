const mongoose = require("mongoose")

const connectDB =async () =>{
    try {
        mongoose.connection.on("connected" , () => console.log("Database connection success"))
        await mongoose.connect(process.env.MONGODB_URI+"/Resume-Builder")
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = connectDB