const { createcart } = require('../repositories/cartRepository');
const {find,create}=require('../repositories/userRepository')
async function registeruser(userdetails){
    try{
        const user=await find({
            email:userdetails.email,
            password:userdetails.password
        });
        if(user){
            throw{message:'An user already exists',statusCode:400}
        }
        const newuser=await create(userdetails);
        if(!newuser){
            throw{message:"something went wrong"}
        }
        await createcart(newuser._id)
        return newuser
    }catch(error){
        console.log(error)
    }
}
module.exports=registeruser