import React, { useEffect, useState } from "react";
import api from "../api/axios";

export default function AdminRestaurant() {
  const [restaurants, setRestaurants] = useState([]);
  const [newRestaurant, setNewRestaurant] = useState({ name: "", address: "" });

  const fetchRestaurants = () => {
    api
      .get("/Restaurants")
      .then((res) => setRestaurants(res.data))
      .catch((err) => console.error("Error fetching restaurants:", err));
  };

  const handleAddRestaurant = () => {
    if (!newRestaurant.name || !newRestaurant.address) {
      alert("Please fill in both fields!");
      return;
    }
    api
      .post("/Restaurants", newRestaurant)
      .then(() => {
        alert("Restaurant added successfully!");
        setNewRestaurant({ name: "", address: "" });
        fetchRestaurants();
      })
      .catch((err) => console.error("Error adding restaurant:", err));
  };

  const handleDeleteRestaurant = (id) => {
    if (!window.confirm("Are you sure you want to delete this restaurant?")) return;

    api
      .delete(`/Restaurants/${id}`)
      .then(() => {
        alert("Restaurant deleted successfully!");
        fetchRestaurants();
      })
      .catch((err) => console.error("Error deleting restaurant:", err));
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">🍴 Manage Restaurants</h2>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Restaurant Name"
          value={newRestaurant.name}
          onChange={(e) => setNewRestaurant({ ...newRestaurant, name: e.target.value })}
          className="border rounded p-2 flex-1"
        />
        <input
          type="text"
          placeholder="Address"
          value={newRestaurant.address}
          onChange={(e) => setNewRestaurant({ ...newRestaurant, address: e.target.value })}
          className="border rounded p-2 flex-1"
        />
        <button
          onClick={handleAddRestaurant}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          Add
        </button>
      </div>

      <table className="w-full text-left border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Address</th>
            <th className="border p-2 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {restaurants.map((r) => (
            <tr key={r.restaurant_id}>
              <td className="border p-2">{r.restaurant_id}</td>
              <td className="border p-2">{r.name}</td>
              <td className="border p-2">{r.address}</td>
              <td className="border p-2 text-center">
                <button
                  onClick={() => handleDeleteRestaurant(r.restaurant_id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
