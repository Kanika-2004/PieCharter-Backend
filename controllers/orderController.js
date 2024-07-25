const {createOrder,updateorder,getallordercreatedbyuser,getallorderdetailsbyorderid} = require('../services/orderServices')
async function createneworder(req,res){
    try{
        const cart=await createOrder(req.user.id,req.body.paymentmethod);
        console.log(cart)
        return res.status(200).json({
            success:true,
            data:cart,
            erro:{},
            message:"created the order"
        })
    }catch(error){
        console.log(error)
        return res.status(404).json({
            success:false,
            data:{},
            error:error,
            message:"cannot create the order"
        })
    }
}
async function getAllOrderByUser(req,res){
    try{

        const cart=await getallordercreatedbyuser(req.user.id);
        console.log(req.user.id);
        return res.status(200).json({
            success:true,
            data:cart,
            erro:{},
            message:"got the order of specific user"
        })
    }catch(error){
        console.log(req.user.id)
        console.log("error is here",error)
        return res.status(404).json({
            success:false,
            data:{},
            error:error,
            message:"cannot get the order"
        })
    }
}
async function getAllOrderByUserByOrderId(req,res){
    try{
        const response=await getallorderdetailsbyorderid(req.params.orderid);
        console.log(req.params.orderid)
        console.log(response)
        return res.status(200).json({
            success:true,
            data:response,
            erro:{},
            message:"cfetched  the order"
        })
    }catch(error){
        console.log(req.params.orderid)
        console.log(error)
        return res.status(404).json({
            success:false,
            data:{},
            error:error,
            message:"cannot fetch the order"
        })
    }
}
async function cancelorder(req,res){
    try{
        const response=await updateorder(req.params.orderid,"CANCELLED");
        console.log(req.user.id)
        console.log(response)
        return res.status(200).json({
            success:true,
            data:response,
            erro:{},
            message:"cancelled  the order"
        })
    }catch(error){
        console.log(error)
        return res.status(404).json({
            success:false,
            data:{},
            error:error,
            message:"cannot cancel the order"
        })
    }
}
async function changeorderstatus(req,res){
    try{
        const response=await updateorder(req.params.orderid,req.params.status);
        console.log(req.user.id)
        console.log(response)
        return res.status(200).json({
            success:true,
            data:response,
            erro:{},
            message:"changed   the status of the order"
        })
    }catch(error){
        console.log(error)
        return res.status(404).json({
            success:false,
            data:{},
            error:error,
            message:"cannot change the status of the order"
        })
    }
}
module.exports={
    changeorderstatus,
    cancelorder,
    getAllOrderByUserByOrderId,
    getAllOrderByUser,
    createneworder
}