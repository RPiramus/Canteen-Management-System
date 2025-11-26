import React, {useEffect, useState} from "react";
import api from "../api/axios";

function MyOrder({userId}) {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [orderItems, setOrderItems] = useState([]);

    const fetchOrders = () => {
        if (userId) {
          api
            .get(`/Orders/${userId}`)
            .then((response) => setOrders(response.data))
            .catch((error) => console.error("Error fetching orders:", error));
        }
    };

    const handleConfirmReceipt = async (order_id) => {
        try {
          await api.put(`/Orders/${order_id}/status`, { status: "completed" });
          alert("Order confirmed successfully!");
          fetchOrders();
        } catch (error) {
          console.error("Error updating order status:", error);
          alert("Failed to confirm order.");
        }
    };
    
    useEffect(() => {
        fetchOrders();
      }, [userId]);

    const handleViewDetails = (orderId) => {
        setSelectedOrder(orderId);
        api
            .get(`/OrderItems/${orderId}`)
            .then(response => setOrderItems(response.data))
            .catch(error => console.error("Error fetching order items:", error));
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md w-full">
          <h2 className="text-xl font-semibold mb-4">📦 My Orders</h2>
    
          {orders.length === 0 ? (
            <p className="text-gray-500">No orders yet.</p>
          ) : (
            <table className="w-full text-left border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 border">Order ID</th>
                  <th className="p-2 border">Date</th>
                  <th className="p-2 border">Total</th>
                  <th className="p-2 border">Status</th>
                  <th className="p-2 border"></th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.order_id}>
                    <td className="border p-2">{o.order_id}</td>
                    <td className="border p-2">{o.order_date}</td>
                    <td className="border p-2">${o.total_amount.toFixed(2)}</td>
                    <td className="border p-2 capitalize">
                        {o.status === "shipped" ? (
                        <button
                            onClick={() => handleConfirmReceipt(o.order_id)}
                            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                        >
                            Confirm Receipt
                        </button>
                        ) : o.status === "completed" ? (
                        <span className="text-green-600 font-semibold">Completed ✅</span>
                        ) : (
                        <span>{o.status}</span>
                        )}
                    </td>
                    <td className="border p-2">
                      <button
                        onClick={() => handleViewDetails(o.order_id)}
                        className="text-purple-600 hover:underline"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {selectedOrder && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">
                🍽️ Order #{selectedOrder} Details
              </h3>
              {orderItems.length === 0 ? (
                <p className="text-gray-500">Loading items...</p>
              ) : (
                <ul className="space-y-2">
                  {orderItems.map((item, i) => (
                    <li
                      key={i}
                      className="flex justify-between border p-2 rounded"
                    >
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
export default MyOrder;
