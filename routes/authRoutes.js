const loginUser=require('../controllers/authController')
const express=require('express')
const authrouter=express.Router()
authrouter.post('/login',loginUser)
module.exports=authrouter