const {getcartbyuserid,clearcart} = require("../repositories/cartRepository");
const cart = require("../schemas/cartSchema");
const product = require("../schemas/productSchema");
const { findProductById } = require("../repositories/productRepository");
async function getcart(userid){
    const cart=await getcartbyuserid(userid)
    if(!cart){
        throw{message:"no cart found"}
    }
    return cart
}
async function modifycart(userid,productid,shouldadd=true){
    const qty=(shouldadd==true)?1:-1;
    const cart=await getcart(userid)
    console.log("i am in cart service",cart)
    const product=await findProductById(productid)
    console.log("i am in cart service",product);
    if(!product){
        throw{message:"no product found"}
    }
    if(product.inStock==false || product.quantity<=0){
        throw{message:"invalid request"}
    }
   let foundproduct=false;
   
    cart.item.forEach((items)=>{
        console.log(items)
        if(items.product._id==productid){
            if(shouldadd){
                if(product.quantity>= items.quantity+1) {
                    items.quantity +=qty   
                              
                }
                else{
                    throw{message:"cannot add product as less supply"}
                }
            }else{
                if(items.quantity>0){
                    items.quantity+=qty;
                    if(items.quantity==0){
                        cart.item= cart.item.filter((items)=> items.product._id!=productid)
                        foundproduct=true
                        return
                    }
                }else{
                    throw{message:"quantity is less than 0"}
                }
            }
            foundproduct=true
        }
        
    })


if(!foundproduct){
    if(shouldadd){
        cart.item.push({
            product:productid,
            quantity:1

        })
        
    }else{
        throw{message:"number of products is less than 1"}
    }
}
await cart.save();

return cart
}
async function clearproductsfromcart(userid){
    const response=await clearcart(userid)
    console.log(response)
    return response
}
module.exports={
    clearproductsfromcart,
    modifycart,
    getcart
}