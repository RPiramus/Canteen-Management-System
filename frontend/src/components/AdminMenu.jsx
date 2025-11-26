import React, {useState, useEffect} from "react";
import api from "../api/axios";

export default function AdminMenu({restaurantId}) {
    const [restaurants, setRestaurants] = useState([]);
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);
    const [menuItems, setMenuItems] = useState([]);
    const [newItem, setNewItem] = useState({ name: "", price: "" });

    useEffect(() => {
      api.get("/Restaurants")
        .then(res => setRestaurants(res.data))
        .catch(err => console.error("Error loading restaurants:", err));
    }, []);
    
    useEffect(() => {
        if (selectedRestaurant) {
          api
            .get(`/MenuItems/${selectedRestaurant}`)
            .then((res) => setMenuItems(res.data))
            .catch((err) => console.error("Error fetching menu items:", err));
        } else {
          setMenuItems([]);
        }
    }, [selectedRestaurant]);

    const handleAddItem = async () => {
        if (!selectedRestaurant || !newItem.name || !newItem.price) {
          alert("Please select a restaurant and fill all fields!");
          return;
        }
    
        try {
          await api.post("/MenuItems", {
            restaurant_id: selectedRestaurant,
            name: newItem.name,
            price: parseFloat(newItem.price),
          });
          setNewItem({ name: "", price: "" });
          api.get(`/MenuItems/${selectedRestaurant}`).then(res => setMenuItems(res.data));
        } catch (err) {
          console.error("Error adding item:", err);
        }
    };
    
    const handleDelete = async (item_id) => {
        if (!window.confirm("Are you sure you want to delete this item?")) return;
        try {
          await api.delete(`/MenuItems/${item_id}`);
          setMenuItems(menuItems.filter(item => item.item_id !== item_id));
        } catch (err) {
          console.error("Error deleting item:", err);
        }
    };

    return (
        <div className="w-full p-6 bg-white">
          <h2 className="text-2xl font-semibold mb-4">🍔 Manage Menu Items</h2>

          <div className="mb-4">
            <label className="font-medium mr-2">Select Restaurant:</label>
            <select
              className="border p-2 rounded"
              onChange={(e) => setSelectedRestaurant(e.target.value)}
              value={selectedRestaurant || ""}
            >
              <option value="">-- Choose --</option>
              {restaurants.map((r) => (
                <option key={r.restaurant_id} value={r.restaurant_id}>
                  {r.name}
                </option>
              ))}
            </select>
          </div>
          <table className="w-full border text-left mb-6">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">Item Name</th>
                <th className="border p-2">Price</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {menuItems.map((item) => (
                <tr key={item.item_id}>
                  <td className="border p-2">{item.name}</td>
                  <td className="border p-2">${item.price.toFixed(2)}</td>
                  <td className="border p-2">
                    <button
                      onClick={() => handleDelete(item.item_id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
    
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Name"
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              className="border p-2 rounded w-1/3"
            />
            <input
              type="number"
              placeholder="Price"
              value={newItem.price}
              onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
              className="border p-2 rounded w-1/3"
            />
            <button
              onClick={handleAddItem}
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
            >
              Add Item
            </button>
          </div>
        </div>
    );
}