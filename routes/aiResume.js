const express =require("express")
const userAuth = require("../middlewear/userAuth")
const { enhanceSumController, enhanceJobDesc, uploadResume } = require("../controllers/enhanceSum.controller")

const aiResumeRouter = express.Router()

aiResumeRouter.post("/enhance-sum" , userAuth , enhanceSumController)
aiResumeRouter.post("/enhance-job" , userAuth , enhanceJobDesc)
aiResumeRouter.post("/upload-resume" , userAuth , uploadResume)

module.exports = aiResumeRouter