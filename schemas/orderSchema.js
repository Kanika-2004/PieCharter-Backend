const mongoose=require('mongoose')
const orderSchema= new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        unique:true
    },
    item:[{
        product:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'product',
            required:true
        },
        quantity:{
            type:Number,
            default:1,
        }
    }],
    totalprice:{
        type:Number
    },
    paymentmethod:{
        type:String,
        enum:["ONLINE","OFFLINE"]
    },
    address:{
        type:String
    },
    status:{
        type:String,
        enum:["CANCELLED","ORDERED","DELIVERED","OUT_FOR_DELIVERY","PROCESSING"]
    }
},{timestamps:true})
const order=mongoose.model("order",orderSchema)
module.exports=order;