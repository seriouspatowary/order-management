import { getAllOrderModel,getOrderByIdModel,addNewOrderModel,updateOrderByIdModel,deleteOrderByIdModel,getProductModel} from '../models/orders.model.js'


export const getAllOrderService = async(req)=>{
    try {
    
        const response_= await getAllOrderModel(req)
        return response_;
     
       } catch (err) {
         throw err;
         
       }
}

export const getOrderByIdService = async(req)=>{
    try {
    
        const response_= await getOrderByIdModel(req)
        return response_;
     
       } catch (err) {
         throw err;
         
       }
}

export const addNewOrderService =  async(req)=>{
    try {
    
        const response_= await addNewOrderModel(req)
        return response_;
     
       } catch (err) {
         throw err;
         
       }
}


export const updateOrderByIdService = async(req)=>{
    try {
    
        const response_= await updateOrderByIdModel(req)
        return response_;
     
       } catch (err) {
         throw err;
         
       }
}
export const deleteOrderByIdService = async(req)=>{
    try {
    
        const response_= await deleteOrderByIdModel(req)
        return response_;
     
       } catch (err) {
         throw err;
         
       }
}
export const getProductService = async(req)=>{
    try {
    
        const response_= await getProductModel(req)
        return response_;
     
       } catch (err) {
         throw err;
         
       }
}