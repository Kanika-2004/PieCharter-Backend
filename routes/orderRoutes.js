const {createneworder, changeorderstatus,cancelorder,getAllOrderByUserByOrderId,
    getAllOrderByUser,} =require('../controllers/orderController')
    const express=require('express')
const isLoggedIn = require('../validation/authValidator')
const orderRoute= express.Router()
orderRoute.post('/',isLoggedIn,createneworder)
orderRoute.get('/',isLoggedIn,getAllOrderByUser)
orderRoute.get('/:orderid',isLoggedIn,getAllOrderByUserByOrderId)
orderRoute.put('/:orderid/cancel',isLoggedIn,cancelorder)
orderRoute.put('/:orderid/:status',isLoggedIn,changeorderstatus)
module.exports=orderRoute