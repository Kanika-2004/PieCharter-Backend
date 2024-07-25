const cloudinary=require('../config/cloudinaryConfig')
const fs=require('fs/promises')
const productRepository=require('../repositories/productRepository')
async function findproductbyid(productid){
    const response=await productRepository.findProductById(productid);
    if(!response){
        throw{message:"no product found"}
    }
    return response
}
async function findproduct(){
    const response=await productRepository.findallProduct();
    if(!response){
        throw{message:"no product found"}
    
    }
    return response
}
async function deleteproductbyid(productid){
    const response=await productRepository.deleteProductById(productid);
    if(!response){
        throw{message:"cannot delete the product"}
    }
    return response
}
async function createproduct(productdetails){
    const imagepath=productdetails.imagePath
    if(imagepath){
        try{
        const resp=await cloudinary.uploader.upload(imagepath)
        var productImage=resp.secure_url
        console.log(productImage)
        await fs.unlink(process.cwd() + "/" + imagepath);
        }catch(error){
            console.log(error)
            throw{message:"error occurred while uploading"}
        }
    }
    const response=await productRepository.createProduct({
        ...productdetails
    });
    if(!response){
        throw{message:"no product found"}
    }

    return response
}
module.exports={
    createproduct,
    findproduct,
    findproductbyid,
    deleteproductbyid
}