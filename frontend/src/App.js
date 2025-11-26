import React, { useState } from "react";
import RestaurantList from "./components/RestaurantList";
import MenuList from "./components/MenuList";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import CartPanel from "./components/CartPanel";
import MyOrder from "./components/MyOrder";
import AdminDashboard from "./components/AdminDashboard";
import api from "./api/axios";

function App() {
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [currentPage, setCurrentPage] = useState("home");


  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const handleAddToCart = (item) => {
    setCartItems((prevItems) =>  {
      const exist = prevItems.find((i) => i.item_id === item.item_id);
      if (exist) {
        return prevItems.map((i) =>
          i.item_id === item.item_id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };

  const handleQuantityChange = (item_id, qty) => {
    setCartItems((prevItems) =>
      prevItems
        .map((i) =>
          i.item_id === item_id ? { ...i, quantity: qty } : i
        )
        .filter((i) => i.quantity > 0)
    );
  };

  const handleRemoveFromCart = (item_id) => {
    setCartItems((prevItems) =>
      prevItems.filter((i) => i.item_id !== item_id)
    );
  };

  const handleClearCart = () => {
    setCartItems([]);
  }

  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) {
      alert("Cart is empty!");
      return;
    }
    if (!selectedRestaurant) {
      alert("Please select a restaurant.");
      return;
    }

    const orderData = {
      user_id: user.user_id,
      restaurant_id: selectedRestaurant,
      total_amount: cartTotal,
      items: cartItems.map((item) => ({
        item_id: item.item_id,
        quantity: item.quantity,
        price: item.price,
      })),
    };
    try {
      const response = await api.post("/OrderFull", orderData);
      alert("✅ Order placed successfully!");
      console.log("Order ID:", response.data.order_id);
      handleClearCart();

    } catch (error) {
    }
  };



  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  if (!user) {
    return <Login onLoginSuccess={setUser} />;
  }
  if (user.role === "admin") {
    return <AdminDashboard user={user} onLogout={handleLogout} />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className ="fixed w-full top-0">
        <Navbar user={user} onLogout={handleLogout} cartCount={cartCount} onNavigate={setCurrentPage} />
      </div>

      <div className="flex-1 min-h-screen w-full flex pt-20 overflow-y-auto ">
        {currentPage === "home" ? (
          <div className="flex flex-1">
            <div className="w-1/5 bg-white shadow-md">
              <RestaurantList onSelectRestaurant={setSelectedRestaurant} />
            </div>

            <div className="w-3/5 bg-white shadow-md">
              <MenuList restaurantId={selectedRestaurant} onAddToCart={handleAddToCart}/>
            </div>

            <div className="w-1/5 bg-white shadow-md">
              <CartPanel
                items={cartItems}
                onChangeQuantity={handleQuantityChange}
                onRemoveItem={handleRemoveFromCart}
                onClearCart={handleClearCart}
                TotalPrice={cartTotal}
                onPLaceOrder={handlePlaceOrder}
              />
            </div>
          </div>
        ) : (
              <div className="flex justify-center items-start pt-20 min-h-screen w-full">
                <div className="w-4/5">
                  <MyOrder userId={user.user_id} />
                </div>
              </div>
            )}
      </div>
    </div>
  );
}

export default App;
