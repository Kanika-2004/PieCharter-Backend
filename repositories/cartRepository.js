
const cart=require('../schemas/cartSchema')
async function createcart(userid){
   try{ 
    const newcart=await cart.create({
        user:userid
    });
    return newcart
    }catch(error){
        console.log(error)
    }
}
async function getcartbyuserid(userid){
    try{ const newcart=await cart.findOne({
         user:userid
     }).populate('item.product')
     return newcart
     }catch(error){
         console.log(error)
     }
 }
 async function clearcart(userid){
    try{
        const newcart=await cart.findOne({
            user:userid
        })
        if(!newcart){
            throw{message:"no cart found"}
            
        }
        newcart.item=[]
        await newcart.save()
        return newcart 
    }catch(error){
        console.log(error)
    }
 }
 module.exports={
    createcart,
    clearcart,
    getcartbyuserid
 }