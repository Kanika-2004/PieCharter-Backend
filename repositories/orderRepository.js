const order=require('../schemas/orderSchema')
async function createorder(orderdetails){
    try{
        const Order=await order.create(orderdetails)
        return Order
    }catch(error){
        console.log(error)
        throw{message:"cannot place the order"}
    }
}
async function getorderbyuserid(userid){
    try{
        const Order=await order.findOne({
            user:userid
        }).populate('item.product')
        return Order
    }catch(error){
        console.log(error)
        throw{message:"cannot place the order"}
    }
}
async function getorderbyid(orderid){
    try{
        const Order=await order.findById(orderid).populate('item.product')
        return Order
    }catch(error){
        console.log(error)
        throw{message:"cannot place the order"}
    }
}
async function updateorderstatus(orderid,status){
    try{
        const Order=await order.findByIdAndUpdate(orderid,{status:status},{new:true})
        console.log(Order)
        return Order
    }catch(error){
        console.log(error)
        throw{message:"cannot place the order"}
    }
}
module.exports={
    updateorderstatus,
    getorderbyid,
    getorderbyuserid,
    createorder
}