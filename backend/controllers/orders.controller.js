import {getAllOrderService,getOrderByIdService, addNewOrderService,updateOrderByIdService,deleteOrderByIdService, getProductService} from "../services/orders.service.js"

export const getAllOrderController = async(req,res,next)=>{
    try {
        
        const response = await getAllOrderService(req);
        return res.status(200).json({
            data:response
    
        })
        } catch (err) {
            
                next(err);
        
            }
}



export const getOrderById = async(req,res,next)=>{
    try {
        
        const response = await getOrderByIdService(req);
        return res.status(200).json({
            data:response
    
        })
        } catch (err) {
            
                next(err);
        
            }
}

export const addNewOrder = async(req,res,next)=>{
    try {
        
        const response = await addNewOrderService(req);
        return res.status(200).json({
            data:response
    
        })
        } catch (err) {
            
                next(err);
        
            }
}

export const updateOrderById = async(req,res,next)=>{
    try {
        
        const response = await updateOrderByIdService(req);
        return res.status(200).json({
            data:response
    
        })
        } catch (err) {
            
                next(err);
        
            }
}
export const deleteOrderById = async(req,res,next)=>{
    try {
        
        const response = await deleteOrderByIdService(req);
        return res.status(200).json({
            data:response
    
        })
        } catch (err) {
            
                next(err);
        
            }
}


export const getProducts = async(req,res,next)=>{
    try {
        
        const response = await getProductService(req);
        return res.status(200).json({
            data:response
    
        })
        } catch (err) {
            
                next(err);
        
            }
}