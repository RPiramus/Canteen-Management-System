import React, {useState, useEffect} from "react";
import api from "../api/axios";

export default function AdminOrder() {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [orderItems, setOrderItems] = useState([]);

    const fetchOrders = () => {
        api.get("/Orders")
          .then((res) => setOrders(res.data))
          .catch((err) => console.error("Error fetching orders:", err));
    };
    
    useEffect(() => {
        fetchOrders();
    }, []);

    const handleViewDetails = (orderId) => {
        setSelectedOrder(orderId);
        api.get(`/OrderItems/${orderId}`)
          .then((res) => setOrderItems(res.data))
          .catch((err) => console.error("Error fetching order details:", err));
    };

    const handleStatusChange = async (orderId, newStatus) => {
        try {
          await api.put(`/Orders/${orderId}/status`, { status: newStatus });
          fetchOrders();
          alert("Order status updated!");
        } catch (err) {
          console.error("Error updating order:", err);
        }
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md w-full">
          <h2 className="text-2xl font-semibold mb-4">📦 Manage Orders</h2>
    
          <table className="w-full text-left border">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">Order ID</th>
                <th className="border p-2">User ID</th>
                <th className="border p-2">Restaurant ID</th>
                <th className="border p-2">Total</th>
                <th className="border p-2">Status</th>
                <th className="border p-2 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.order_id}>
                  <td className="border p-2">{o.order_id}</td>
                  <td className="border p-2">{o.user_id}</td>
                  <td className="border p-2">{o.restaurant_id}</td>
                  <td className="border p-2">${o.total_amount.toFixed(2)}</td>
                  <td className="border p-2 capitalize">{o.status}</td>
                  <td className="border p-2 text-center space-x-2">
                    <button
                      onClick={() => handleViewDetails(o.order_id)}
                      className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleStatusChange(o.order_id, "shipped")}
                      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                    >
                      shipped
                    </button>
                    <button
                      onClick={() => handleStatusChange(o.order_id, "canceled")}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
    
          {selectedOrder && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">
                🍽️ Order #{selectedOrder} Details
              </h3>
              {orderItems.length === 0 ? (
                <p className="text-gray-500">Loading...</p>
              ) : (
                <ul className="space-y-2">
                  {orderItems.map((item, i) => (
                    <li key={i} className="flex justify-between border p-2 rounded">
                      <span>{item.item}</span>
                      <span>
                        {item.quantity} × ${item.price.toFixed(2)}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
    );
}

