const jwt=require('jsonwebtoken')
const { JWT_SECRET } = require('../config/serverConfig')
async function isLoggedIn(req,res,next){
    console.log("inside isloggedin",req.cookies)
    const token=req.cookies["authToken"]
    // console.log(token)
    if(!token){
        return res.status(401).json({
            success:false,
            data:{},
            message:"no token provided"        
        })
    }
    try{
        const decoded=jwt.verify(token,JWT_SECRET)
        console.log(decoded)
        if(!decoded){
            throw{message:"wrong token provided"}
        
        }
        req.user={
            email:decoded.email,
            id:decoded.id
        }
        console.log(req.user);
        next();
    }catch(error){
        return res.status(404).json({
            success:false,
            message:"an error occurred"
        })
    }
}
module.exports=isLoggedIn