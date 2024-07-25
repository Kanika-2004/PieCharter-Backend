const loginUser=require('../controllers/authcontroller')
const express=require('express')
const authrouter=express.Router()
authrouter.post('/login',loginUser)
module.exports=authrouter