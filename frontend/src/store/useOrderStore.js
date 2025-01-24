import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useOrderStore = create((set) => ({
  orders: [],
  products: [], 
  isLoadingOrders: false,
  isLoadingProducts: false, 

  fetchOrders: async () => {
    set({ isLoadingOrders: true });
    try {
      const res = await axiosInstance.get("/order");
      set({ orders: res.data.data });
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to load orders.");
    } finally {
      set({ isLoadingOrders: false });
    }
  },

addOrder: async (newOrder) => {
  try {
    const res = await axiosInstance.post("/orders", newOrder);
    if (res.data.data.status_code === "200") {
      toast.success("Order added successfully!");
      
    } else {
      toast.error(res.data.message || "Failed to add order.");
    }
  } catch (error) {
    console.error("Error adding order:", error);
    toast.error("Failed to add order.");
  }
},



updateOrder: async (orderId, updatedOrderData) => {
  try {
    const res = await axiosInstance.put(`/orders/${orderId}`, updatedOrderData);
    if (res.data.data.status_code === "200") {
      set((state) => ({
        orders: state.orders.map((order) =>
          order.order_id === orderId
            ? { ...order, ...updatedOrderData, updated_at: new Date().toISOString() }
            : order
        ),
      }));
      toast.success("Order updated successfully!");
    } else {
      toast.error(res.data.data.message || "Failed to update order.");
    }
  } catch (error) {
    console.error("Error updating order:", error);
    toast.error("Failed to update order.");
  }
}
,


   deleteOrder: async (orderId) => {
    try {
      const res = await axiosInstance.delete(`/orders/${orderId}`);
      if (res.data.data.status_code === "200") {
        set((state) => ({
          orders: state.orders.filter((order) => order.order_id !== orderId), 
        }));
        toast.success("Order deleted successfully!");
      } else {
        toast.error(res.data.message || "Failed to delete order.");
      }
    } catch (error) {
      console.error("Error deleting order:", error);
      toast.error("Failed to delete order.");
    }
  },
   
   
  // Fetch products
  fetchProducts: async () => {
    set({ isLoadingProducts: true });
    try {
      const res = await axiosInstance.get("/products");
      set({ products: res.data.data }); 
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to load products.");
    } finally {
      set({ isLoadingProducts: false });
    }
  },
}));
