const gemini = require("../config/gemini.js");
const resumeModel = require("../models/resume.model.js");

const enhanceSumController = async (req, res) => {
    try {
        const { prompt } = req.body;
        const systemInstruction = "You are an expert in resume writing. Your task is to enhance the professional summary of a resume. The summary should be 1-2 sentences also highlighting key skills, experience, and career objectives. Make it compelling and ATS_friendly and only return text no options or anything else. : "

        const response = await gemini.models.generateContent({
            model: process.env.GEMINI_MODEL_NAME, // Fast and efficient
            contents: systemInstruction + prompt
        });
        res.status(200).send(response.text); // Response nikalne sahi tarika

    } catch (error) {
        res.status(500).send("AI Error: " + error.message);
    }
}

const enhanceJobDesc = async (req, res) => {
    try {
        const { prompt } = req.body;
        const systemInstruction = "You are an expert in resume writing. Your task iis to enhance the job description of a resyme. The job description should be only 1-2 sentence also highlighting key responsibilities and acheivements. Use action verbs and quantifiable results where possible. Make it ATS-friendly and only return text no options or anything else. : "

        const response = await gemini.models.generateContent({
            model: process.env.GEMINI_MODEL_NAME, // Fast and efficient
            contents: systemInstruction + prompt
        });
        res.send(response.text); // Response nikalne sahi tarika

    } catch (error) {
        res.status(500).send("AI Error: " + error.message);
    }
}
// controller for uploading resume to the DB

const uploadResume = async (req, res) => {
    try {

        const { resumeText, title } = req.body
        const { _id } = req.data
        if (!resumeText) {
            return res.status(400).send("Fields are required")
        }

        const systemInstruction = "You are an expert AI agent to extract data from resume. "
        const prompt = `extract data from this resume : ${resumeText} 
        Provide data in the followinf JSON format with no additional text before or after:
        {
         professional_summary: {
        type: Boolean,
        default: ""
    },
    skills: [{
        type: String
    }]
    ,
    personal_info: {
        image: {
            type: String,
            default: ""
        }, fullName: {
            type: String,
            default: ""
        }, profession: {
            type: String,
            default: ""
        }, email: {
            type: String,
            default: ""
        }, phone: {
            type: String,
            default: ""
        },
        location: {
            type: String,
            default: ""
        },
        linkedin: {
            type: String,
            default: ""
        },
        website: {
            type: String,
            default: ""
        },
    },
    experience :[
        {
            company : {type : String},
            position : {type : String},
            start : {type : String},
            end : {type : String},
            description : {type : String},
            is_current : {type : String},
        }
    ],
    project :[
        {
            name : {type : String},
            type : {type : String},
            description : {type : String},
        }
    ],
     education :[
        {
            isntitute : {type : String},
            degree : {type : String},
            graduation_date : {type : String},
            gpa : {type : String},
            
        }
    ]}
    `

        const response = await gemini.models.generateContent({
            model: process.env.GEMINI_MODEL_NAME, // Fast and ]
            contents: systemInstruction + prompt,
             generationConfig: {
                responseMimeType: "application/json",
            },
        });
        const aiRes = response.text
        const data = JSON.parse(aiRes)
        const newData = await resumeModel.create({
            userId : _id,
            title,
            ...data
        })
        res.send({resumeId : newData._id}); 
    } catch (error) {
        res.status(500).send("AI Error: " + error.message);
    }
}

module.exports = { enhanceSumController, enhanceJobDesc, uploadResume }