const resumeModel = require("../models/resume.model")
const imagekit = require('../config/imagekit.js')
const fs = require('fs')

const createResume = async (req, res) => {
    try {
        const { _id } = req.data
        const { title } = req.body
        // Creating new resume

        const newResume = await resumeModel.create({
            userID: _id,
            title
        })
        const allResume = await resumeModel.find({
            userID: _id
        })
        res.status(201).send(allResume)

    } catch (error) {
        return res.status(400).send(error.message)
    }
}

const deleteResume = async (req, res) => {
    try {
        const { _id } = req.data
        const { resumeId } = req.params
        await resumeModel.findOneAndDelete({
            userID: _id,
            _id: resumeId
        })
        const newResumes = await resumeModel.find({
            userID: _id
        })

        res.status(200).send(newResumes)

    } catch (error) {
        return res.status(400).send(error.message)
    }
}

const getResumeById = async (req, res) => {
    try {
        const { _id } = req.data
        const { resumeId } = req.params

        const resume = await resumeModel.findOne({
            userID: _id,
            _id: resumeId
        })
        if (!resume) return res.status(404).send("Resume not found")
        resume.__v = undefined
        resume.createdAt = undefined
        resume.updatedAt = undefined
        res.status(200).send(resume)

    } catch (error) {
        return res.status(400).send(error.message)
    }
}

const getPublicResumeById = async (req, res) => {
    try {

        const { resumeId } = req.params

        const resume = await resumeModel.findOne({
            _id: resumeId,
            public: true
        })

        if (!resume) return res.status(404).send("Resume not found")


        res.status(200).send(resume)

    } catch (error) {
        return res.status(400).send(error.message)
    }
}

// controller for updating resume

const updateTitle = async (req, res) => {
    try {
        const { _id } = req.data
        const { resumeId, title } = req.body

        const resume = await resumeModel.findOneAndUpdate({
            userID: _id,
            _id: resumeId
        }, {
            title
        } , { returnDocument: 'after' }
)

        const newResumes = await resumeModel.find({
            userID: _id
        })


        res.status(200).send(newResumes)

    } catch (error) {
        return res.status(400).send(error.message)
    }
}
const updateResume = async (req, res) => {
    try {
        const { _id } = req.data
        const { resumeId, resumeData, removeBackground } = req.body
        const image = req.file

        let resumeCopy = JSON.parse(resumeData)

       

        if (image) {

            const imageBuffer = fs.createReadStream(image.path)

            const response = await imagekit.files.upload({
                file: imageBuffer,
                fileName: 'resume.jpg',
                folder: 'user-resumes',
                transformation: {
                    pre: 'w-300 , h-300 , fo-face  , z-0.75' + (removeBackground ? ',e-bgremove' : '')
                }
            });

            resumeCopy.personal_info.image = response.url
            delete resumeCopy.createdAt

        }

        const updatedResume = await resumeModel.findOneAndUpdate({
           
            _id: resumeId
        }, {
            userID : resumeCopy.userID ,
            title : resumeCopy.title ,
            public : resumeCopy.public ,
            template : resumeCopy.template ,
            accent_color : resumeCopy.accent_color ,
            professional_summary : resumeCopy.professional_summary ,
            skills : resumeCopy.skills,
            experience : resumeCopy.experience,
            project : resumeCopy.project,
            education : resumeCopy.education,
            personal_info : resumeCopy.personal_info,
        }, { returnDocument: 'after'}
        )

        return res.status(200).send( updatedResume )

        // const resume = await resumeModel.findOne({
        //     _id: resumeId,
        //     public: true
        // })

        // if (!resume) return res.status(404).send("Resume not found")


        // res.status(200).send(resume)

    } catch (error) {
        return res.status(400).send(error.message)
    }
}



module.exports = { createResume, deleteResume, updateTitle, getResumeById, getPublicResumeById, updateResume }