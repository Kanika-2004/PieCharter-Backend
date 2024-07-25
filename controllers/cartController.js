const {getcart,clearproductsfromcart,modifycart} = require('../services/cartService')
async function getcarbyuser(req,res){
    try{
        const cart=await getcart(req.user.id);
        console.log(cart)
        return res.status(200).json({
            success:true,
            data:cart,
            erro:{},
            message:"fetched the cart"
        })
    }catch(error){
        console.log(error)
        return res.status(404).json({
            success:false,
            data:{},
            error:error,
            message:"cannot fetch the cart"
        })
    }
}
async function modifycartbyuser(req,res){
    try{

        const cart=await modifycart(req.user.id,req.params.productid,req.params.operation=='add');
        console.log(req.user.id);
        return res.status(200).json({
            success:true,
            data:cart,
            erro:{},
            message:"modified the cart"
        })
    }catch(error){
        console.log(req.user.id)
        console.log("error is here",error)
        return res.status(404).json({
            success:false,
            data:{},
            error:error,
            message:"cannot modify the cart"
        })
    }
}
async function clearcartbyuser(req,res){
    try{
        const response=await clearproductsfromcart(req.user.id);
        console.log(req.user.id)
        console.log(response)
        return res.status(200).json({
            success:true,
            data:response,
            erro:{},
            message:"cleared product from the cart"
        })
    }catch(error){
        console.log(error)
        return res.status(404).json({
            success:false,
            data:{},
            error:error,
            message:"cannot clear the product from the cart"
        })
    }
}
module.exports={
    clearcartbyuser,
    getcarbyuser,
    modifycartbyuser
}