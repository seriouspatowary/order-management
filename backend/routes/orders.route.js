import express from 'express';
import {getAllOrderController,getOrderById,addNewOrder,updateOrderById,deleteOrderById,getProducts} from "../controllers/orders.controller.js"

const router = express.Router();

router.get("/order", getAllOrderController);
router.get("/order/:id", getOrderById);
router.post("/orders", addNewOrder)

router.put("/orders/:id", updateOrderById)
router.delete("/orders/:id", deleteOrderById)

router.get("/products",getProducts)



export default router;