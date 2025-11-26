import React ,{useState} from "react";
import AdminRestaurant from "./AdminRestaurant";
import AdminMenu from "./AdminMenu";
import AdminOrder from "./AdminOrder";

export default function AdminDashboard({ user, onLogout }) {
    const [currentSection, setCurrentSection] = useState("restaurants");

    return (
        <div className="min-h-screen bg-white flex flex-col m-0 p-0">
            <div className="bg-white shadow-md p-2 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-purple-700">
                🛠️ Admin Dashboard
                </h1>
                <button
                    onClick={() => setCurrentSection("restaurants")}
                    className={`px-4 py-2 rounded ${
                    currentSection === "restaurants"
                        ? "bg-purple-600 text-white"
                        : "bg-white border"
                    }`}
                >
                    Restaurants
                </button>

                <button
                    onClick={() => setCurrentSection("menus")}
                    className={`px-4 py-2 rounded ${
                    currentSection === "menus"
                        ? "bg-purple-600 text-white"
                        : "bg-white border"
                    }`}
                >
                    Menus
                </button>

                <button
                    onClick={() => setCurrentSection("orders")}
                    className={`px-4 py-2 rounded ${
                    currentSection === "orders"
                        ? "bg-purple-600 text-white"
                        : "bg-white border"
                    }`}
                >
                    Orders
                </button>
                <div className="flex items-center gap-4">
                <span className="text-gray-700">Welcome, {user.name}</span>
                <button
                    onClick={onLogout}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                    Logout
                </button>
                </div>
            </div>

            <div className=" justify-center w-full items-center text-gray-600 p-5">
            {currentSection === "restaurants" && <AdminRestaurant />}
            {currentSection === "menus" && <AdminMenu />}
            {currentSection === "orders" && (<AdminOrder />)}
            </div>
        </div>
    );
}
