import React, {useState} from "react";
import axios from "axios";
import CUHKSZ_bg from "../assets/CUHKSZ_BG.jpg";

function Login ({onLoginSuccess}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const formData = new FormData();
            formData.append("username", email);
            formData.append("password", password);
            const response = await axios.post("http://127.0.0.1:8000/Login", formData);
            onLoginSuccess(response.data);
        } catch (err) {
            console.error(err);
            setError("Invalid email or password");
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${CUHKSZ_bg})` }}
        >
        <form onSubmit={handleSubmit} className="bg-white opacity-80 p-8 rounded-lg shadow-md w-96">
          <h2 className="text-2xl font-bold mb-6 text-center"> CUHK(SZ) Login</h2>
    
          {error && <p className="text-red-500 mb-3 text-center">{error}</p>}
    
          <div className="mb-4">
            <label className="block mb-2 font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
              placeholder="example@cuhk.edu.com"
              required
            />
          </div>
    
          <div className="mb-4">
            <label className="block mb-2 font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
              placeholder="Enter your password"
              required
            />
          </div>
    
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    );
}
export default Login;