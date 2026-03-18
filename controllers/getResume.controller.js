const resumeModel = require("../models/resume.model")


const getResumeController = async (req , res) => {
    try {
        const {_id} = req.data

        const resumes = await resumeModel.find({
            userID : _id
        })
        if(!resumes) return res.send("No resuems yet")
        return res.status(200).send(resumes)

        
    } catch (error) {
        return res.status(400).send(error.message)
    }
}

module.exports = getResumeController