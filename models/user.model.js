const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    username : {
        type : String,
        required : [true , "This field is necessary"],
        unique : [true , "This name is already taken"]
    }, 
     password : {
        type : String,
        required : [true , "This field is necessary"],
        select : false
    }
} , {timestamps : true})

const userModel  =  mongoose.model("User" , userSchema)

module.exports = userModel