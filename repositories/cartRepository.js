const mongoose= require('mongoose')
const cart=require('../schemas/cartSchema')
const User = require('../schemas/userSchema')
async function createcart(userId){
   try{ 
    console.log("before creating cart")
    console.log("the user id is",userId)
    console.log(userId)
    // console.log(User)
   

    const newcart=await cart.create({
        user: userId
    });
    console.log("cart created")
    console.log("cart repo",newcart)
    return newcart
    }catch(error){
        console.log(error)
    }
}
async function getcartbyuserid(userid){
    try{ const newcart=await cart.findOne({
         user:userid
     }).populate('item.product')
     console.log("cart repo",newcart)
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