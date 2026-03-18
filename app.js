const express = require("express")
const cors   = require("cors")
const connectDB = require("./config/db")
 require('dotenv').config()
const userRouter = require('./routes/user.js')
const resumeRouter = require('./routes/resume.js')
const cp = require('cookie-parser')
const aiResumeRouter = require("./routes/aiResume.js")


const app = express()
app.use(express.json())
app.use(cors({origin : process.env.CLIENT_URL , credentials : true}))
app.use(cp())

 connectDB()

 app.use("/api/user" , userRouter)
 app.use("/api/resume" , resumeRouter)
 app.use("/api/ai" , aiResumeRouter)
module.exports = app;
app.listen(process.env.PORT , () =>{
    console.log("Server running")
})