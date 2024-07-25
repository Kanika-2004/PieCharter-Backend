const { getcartbyuserid, clearcart } = require('../repositories/cartRepository')
const {createorder,updateorderstatus,getorderbyid,getorderbyuserid} =require('../repositories/orderRepository')
const order = require('../schemas/orderSchema')
const { find } = require('../repositories/userRepository')
async function createOrder(userid,paymentmethod){
    const cart=await getcartbyuserid(userid)
    console.log(cart)
    const user=await find({user:userid})
    console.log(user)
    if(!cart){
        throw{message:"no cart found"}
    }
    if(cart.item.length==0){
        throw{message:"no items present in the cart"}
    }
    const orderobject={}
    orderobject.user=cart.user
    orderobject.item=cart.item.map(cartitem=>{
        return {product:cartitem.product._id,quantity:cartitem.quantity}
    })
    orderobject.status="ORDERED"
    orderobject.totalprice=0;
    cart.item.forEach(items=>{
        orderobject.totalprice+=items.quantity*items.product.price
    })
    orderobject.address=user?.address;
    orderobject.paymentMethod=paymentmethod
    const response=await createorder(orderobject)
    if(!response){
        throw{message:"no order created"}
    }
    await clearcart(userid)
    return response
}
async function getallordercreatedbyuser(userid){
    const response=await getorderbyuserid(userid);
    if(!response) throw{ message:"cannot find orders"}
    return response;
}
async function getallorderdetailsbyorderid(orderid){
    const response=await getorderbyid(orderid);
    if(!response) throw{ message:"cannot find orders"}
    return response;
}
async function updateorder(orderid,status){
    const response=await updateorderstatus(orderid,status)
    if(!response) throw{ message:"cannot find orders"}
    return response;
}
module.exports={
    updateorder,
    getallorderdetailsbyorderid,
    getallordercreatedbyuser,
    createOrder
}