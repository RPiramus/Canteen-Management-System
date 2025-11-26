import React, {useEffect, useState} from "react";
import api from "../api/axios";

function RestaurantList({onSelectRestaurant}) {
    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        api.get("/Restaurants")
        .then(response => setRestaurants(response.data))
        .catch(error => console.error("Error fetching restaurants:", error));
    }, []);

    return (
        <div className="p-4 rounded-lg text-center">
          <h2 className="text-2xl font-bold  mb-3">Restaurants</h2>
          <ul>
            {restaurants.map(r => (
              <li
                key={r.restaurant_id}
                onClick={() => onSelectRestaurant(r.restaurant_id)}
                className="cursor-pointer p-2 hover:bg-gray-200 rounded"
              >
                {r.name}
              </li>
            ))}
          </ul>
        </div>
      );
}
export default RestaurantList;