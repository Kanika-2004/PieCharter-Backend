const User=require('../schemas/userSchema')
async function find(parameter){
    try{
        const response=await User.findOne({...parameter});
    return response
    }
    catch(error){
        console.log("a problem occurred in user repository")
        console.log(error);
    }
}
async function create(userdetails){
    try{
        const response=await User.create({
            email:userdetails.email,
            firstName:userdetails.firstName,
            lastName:userdetails.lastName,
            mobilenumber:userdetails.mobilenumber,
            password:userdetails.password
        })
        return response
    }catch(error){
        console.log(error);
    }
}
module.exports={
    find,
    create
}