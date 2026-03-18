const express = require('express')
const registerController = require('../controllers/register.controller')
const loginController = require('../controllers/login.controller')
const logoutController = require('../controllers/logout.controller')
const userAuth = require('../middlewear/userAuth')
const getUserController = require('../controllers/getuser.controller')

const userRouter = express.Router()

userRouter.post('/register' , registerController)
userRouter.post('/login' ,loginController)
userRouter.get('/logout' ,userAuth , logoutController)
userRouter.get('/get' ,userAuth , getUserController)


module.exports = userRouter