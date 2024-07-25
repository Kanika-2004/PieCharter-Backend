const mongoose=require('mongoose')
const productSchema= new mongoose.Schema({
    productName:{
        type: String,
        minlength:[5,"Minimum length should be 5"]
    },
    productDescription:{
        type:String,
        minlength:[10,"minimum length should be 10 characters"]
    },
    productImage:{
        type: String
    },
    price:{
        type:Number
    },
    quantity:{
        type:Number,
        default:10
    },
    category:{
        type:String,
        enum:["veg","non-veg","drink"],
        default:"veg"
    },
    inStock:{
        type:Boolean,
        default:true
    }
},{timestamps:true})
const product= mongoose.model("product",productSchema)
module.exports=product