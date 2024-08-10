const jwt=require('jsonwebtoken')
const { JWT_SECRET } = require('../config/serverConfig')
const serverConfig = require('../config/serverConfig')
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
        // console.log(decoded)
        console.log(decoded, decoded.exp, Date.now() / 1000);
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
        console.log(error);
        console.log(error.name);
        if(error.name === "TokenExpiredError") {
            res.cookie("authToken","",{
                httpOnly:true,
                sameSite: "lax",
                secure:serverConfig.COOKIE_SECURE,
                maxAge: 7 * 24 * 60 * 60 * 1000,
                                               domain:serverConfig.FRONTEND_URL
            })
             return res.status(200).json({
                success: true,
                message: "Log out successfull fuckkkkkkkk",
                error: {},
                data: {}
            });
        }

        return res.status(401).json({
            success:false,
            message:"an error occurred"
        })
    }
}
module.exports=isLoggedIn