import React, {useEffect, useState} from "react";
import api from "../api/axios";

function MenuList({restaurantId, onAddToCart}) {
    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {
        if (restaurantId) {
            api
              .get(`/MenuItems/${restaurantId}`)
              .then(response => setMenuItems(response.data))
              .catch(error => console.error("Error fetching menu items:", error));
        }
    },[restaurantId]);

    return (
      <div className="p-4 ">
        <h2 className="text-2xl font-semibold mb-3 text-center">Menu</h2>
  
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {menuItems.map((item) => (
            <div
              key={item.item_id}
              className="bg-white border rounded-lg shadow hover:shadow-lg transition transform hover:-translate-y-1"
            >
              <img
                src={item.image_url || "https://via.placeholder.com/200x150"}
                alt={item.name}
                className="w-full h-36 object-cover rounded-t-lg"
              />
              <div className="p-3">
                <h3 className="font-semibold text-gray-800">{item.name}</h3>
                <p className="text-gray-500 mb-2">${item.price.toFixed(2)}</p>
                <button
                  onClick={() => onAddToCart && onAddToCart(item)}
                  className="w-full bg-purple-500 text-white py-1.5 rounded hover:bg-purple-600 transition"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
}
export default MenuList;