const login=require('../services/authService')

async function logout(req,res){
    res.cookie("authToken","",{
        httpOnly:true,
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    })
     return res.status(200).json({
        success: true,
        message: "Log out successfull",
        error: {},
        data: {}
    });
}


async function loginUser(req,res){
    try{
        const response=await login(req.body)
        res.cookie("authToken",response,{
            httpOnly:true,
            secure:false,
            maxAge:7*24*60*60*1000
        });
        return res.status(201).json({
            data:response,
            success:true,
            error:{},
            message:"successfully logged in the user"
        })
    }catch(error){
        console.log(error);
        return res.status(402).json({
            success:false,
            message:"an error occurred"
        })
    }

}
module.exports={
    loginUser,
    logout
}