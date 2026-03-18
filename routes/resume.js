
const express = require("express")
const userAuth = require("../middlewear/userAuth")
const getResumeController = require('../controllers/getResume.controller.js')
const { getResumeById, createResume, deleteResume, updateResume, getPublicResumeById, updateTitle } = require("../controllers/resumeCRUD.controller.js")
const upload = require("../config/multer.js")
const resumeRouter = express.Router()

resumeRouter.get('/userID/get' , userAuth , getResumeController)
resumeRouter.get('/get/:resumeId' , userAuth , getResumeById)
resumeRouter.post('/create' , userAuth , createResume)
resumeRouter.delete('/delete/:resumeId' , userAuth , deleteResume)
resumeRouter.put('/update' , upload.single('image') ,userAuth , updateResume)
resumeRouter.get('/getpublic/:resumeId' , userAuth , getPublicResumeById)

// update title
resumeRouter.put('/edit-title' , userAuth , updateTitle )


module.exports = resumeRouter