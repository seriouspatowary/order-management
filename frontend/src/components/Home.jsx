import React, { useState, useEffect } from "react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useOrderStore } from "../store/useOrderStore";
import toast from "react-hot-toast";

const Home = () => {
  const {
    orders,
    fetchOrders,
    products,
    fetchProducts,
    isLoadingProducts,
    addOrder,
    updateOrder, 
    deleteOrder
  } = useOrderStore();
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

 
  useEffect(() => {
    if (isModalOpen) {
      fetchProducts();
    }
  }, [isModalOpen, fetchProducts]);

 
  const filteredOrders = orders.filter(
    (order) =>
      order.order_description.toLowerCase().includes(search.toLowerCase()) ||
      order.order_id.toString().includes(search)
  );

 
  const handleProductSelection = (productId) => {
    setSelectedProducts((prevSelected) =>
      prevSelected.includes(productId)
        ? prevSelected.filter((id) => id !== productId)
        : [...prevSelected, productId]
    );
  };

  const handleSaveOrder = async (order) => {
    try {
      const orderData = {
        order_description: order.order_description,
        product_id: selectedProducts.join(","),
      };

      if (modalData) {
      
        await updateOrder(modalData.order_id, orderData); 
      } else {
       
        await addOrder(orderData); 
      }

    
      fetchOrders();
      setIsModalOpen(false); 
      setSelectedProducts([]); 
    } catch (error) {
      console.error("Error saving order:", error);
      toast.error("Failed to save order.");
    }
  };


  const handleDeleteOrder = async (orderId) => {
  try {
    await deleteOrder(orderId); 
    fetchOrders();
   
  } catch (error) {
    toast.error("Failed to delete order.");
  }
};


  return (
    <div className="p-6 bg-gray-50 min-h-screen relative">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Order Management</h1>

      {/* Search Bar */}
      <div className="mb-4 flex items-center justify-between">
        <input
          type="text"
          placeholder="Search by order description or ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <button
          onClick={() => {
            setModalData(null); 
            setIsModalOpen(true);
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          New Order
        </button>
      </div>

      {/* Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full table-auto border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b">Order ID</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b">Order Description</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b">Count of Products</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b">Created Date</th>
              <th className="px-4 py-2 text-center text-sm font-medium text-gray-700 border-b">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredOrders.map((order) => (
              <tr key={order.order_id} className="hover:bg-gray-50 transition">
                <td className="px-4 py-2 text-sm text-gray-700">{order.order_id}</td>
                <td className="px-4 py-2 text-sm text-gray-700">{order.order_description}</td>
                <td className="px-4 py-2 text-sm text-gray-700">{order.count_of_products}</td>
                <td className="px-4 py-2 text-sm text-gray-700">{new Date(order.created_at).toLocaleDateString()}</td>
                <td className="px-4 py-2 text-center">
                  <div className="flex justify-center items-center gap-4">
                    <button
                      onClick={() => {
                        setModalData(order);
                        setIsModalOpen(true);
                      }}
                      className="text-blue-600 hover:text-blue-800 transition"
                      title="Edit"
                    >
                      <PencilSquareIcon className="h-5 w-5" />
                    </button>
                    <button onClick={() => handleDeleteOrder(order.order_id)} className="text-red-600 hover:text-red-800 transition">
                      <TrashIcon className="h-5 w-5" />
                    </button>

                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">{modalData ? "Update Order" : "New Order"}</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                handleSaveOrder({
                  order_description: formData.get("description"),
                });
              }}
            >
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <input
                  type="text"
                  name="description"
                  defaultValue={modalData?.order_description || ""}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Products</h3>
                {isLoadingProducts ? (
                  <p>Loading products...</p>
                ) : (
                  products.map((product) => (
                    <div key={product.id} className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        id={`product-${product.id}`}
                        value={product.id}
                        checked={selectedProducts.includes(product.id)}
                        onChange={() => handleProductSelection(product.id)}
                        className="mr-2"
                      />
                      <label htmlFor={`product-${product.id}`} className="text-sm text-gray-700">
                        {product.product_name} - {product.product_description}
                      </label>
                    </div>
                  ))
                )}
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Book Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
