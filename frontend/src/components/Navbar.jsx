import React from "react";
import CUHKSZ from "../assets/CUHKSZ.png";

function Navbar({ user, onLogout, cartCount, onNavigate }) {
    return (
      <nav className="flex justify-between items-center bg-gray-100 shadow px-6 py-3 rounded-md shadow-md">
        <div className="flex items-center gap-2">
            <img
            src={CUHKSZ}
            alt="CUHK FoodSys Logo"
            className="w-8 h-8 object-cover rounded"
            />
            <h1 className="text-2xl font-bold text-purple-600">
            CUHK(SZ) CANTEEN
            </h1>
        </div>
  
        <div className="flex-1 flex justify-center">
        </div>

        <div className="flex-1 flex justify-center">
            {/* Placeholder for future search bar to search food content */}
        </div>
  
        <div className="flex items-center gap-6">
          <span className="text-gray-700 font-medium">
            Welcome, {user?.name}
          </span>
  
          <button
            onClick={() => onNavigate("orders")}
            className="hover:text-purple-700 font-medium"
            >
            My Orders
          </button>

          <button
            onClick={() => onNavigate("home")}
            className="hover:text-purple-700 font-medium"
            >
            Home
          </button>
  
          <button
            onClick={onLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </nav>
    );
  }
  
  export default Navbar;
