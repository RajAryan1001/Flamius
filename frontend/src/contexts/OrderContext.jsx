
import { createContext, useContext, useState, useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  // useCallback se wrap karo taaki useEffect infinite loop na banaye
  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:4000/api/orders");
      console.log("Full API Response:", res.data);

      // Better data extraction
      let ordersArray = [];
      if (Array.isArray(res.data)) {
        ordersArray = res.data;
      } else if (res.data && Array.isArray(res.data.orders)) {
        ordersArray = res.data.orders;
      } else {
        console.warn("Unexpected API response structure:", res.data);
        ordersArray = [];
      }

      console.log("Final orders array:", ordersArray);
      setOrders(ordersArray);
    } catch (err) {
      console.error("Fetch failed:", err);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  }, []); // Empty dependency for useCallback

  const createOrder = async (orderData, navigate) => {
    try {
      const res = await axios.post("http://localhost:4000/api/orders", orderData);
      console.log("Order created:", res.data);
      toast.success("Order Placed Successfully!");
      
      // Refresh orders list
      await fetchOrders();
      
    } catch (err) {
      console.error("Create order failed:", err);
      alert("Failed to place order!");
    }
  };

  // Delete order function
  const deleteOrder = async (orderId) => {
    try {
      const res = await axios.delete(`http://localhost:4000/api/orders/${orderId}`);
      console.log("Order deleted:", res.data);
      toast.success("Order Deleted Successfully!");
      
      // Remove order from local state
      setOrders(prevOrders => prevOrders.filter(order => order._id !== orderId));
      
      return res.data;
    } catch (err) {
      console.error("Delete order failed:", err);
      toast.error("Failed to delete order!");
      throw err;
    }
  };

  // Update order status function (optional but useful)
  const updateOrderStatus = async (orderId, status) => {
    try {
      const res = await axios.patch(`http://localhost:4000/api/orders/${orderId}`, {
        status: status
      });
      console.log("Order status updated:", res.data);
      toast.success(`Order marked as ${status}`);
      
      // Update order in local state
      setOrders(prevOrders => 
        prevOrders.map(order => 
          order._id === orderId ? { ...order, status: status } : order
        )
      );
      
      return res.data;
    } catch (err) {
      console.error("Update order status failed:", err);
      toast.error("Failed to update order status!");
      throw err;
    }
  };

  return (
    <OrderContext.Provider value={{ 
      orders, 
      loading, 
      fetchOrders, 
      createOrder, 
      deleteOrder,
      updateOrderStatus 
    }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => useContext(OrderContext);