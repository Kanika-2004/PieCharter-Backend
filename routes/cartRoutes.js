const express=require('express')
const {getcarbyuser,clearcartbyuser,modifycartbyuser} = require('../controllers/cartController')
const isLoggedIn = require('../validation/authValidator')
const cartRoute= express.Router()
cartRoute.get('/',isLoggedIn,getcarbyuser)
cartRoute.post('/:operation/:productid',isLoggedIn,modifycartbyuser)
cartRoute.delete('/products',isLoggedIn,clearcartbyuser)
module.exports=cartRoute