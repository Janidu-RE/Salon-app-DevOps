import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../config";


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!username || !password) {
      setError("Please enter both username and password");
      return;
    }

    try {
      const res = await axios.post(`${API_BASE_URL}/auth/login`, {
        usernameOrEmail: username,
        password: password,
      });

      console.log(res);
      if (res.data.username) {
        setSuccess("Welcome back, " + res.data.username + "!");
        setError("");

        localStorage.setItem(
          "user",
          JSON.stringify({
            username: res.data.username,
            userId: res.data.userId,
            role: res.data.role,
          })
        );
        
        setTimeout(() => {
          navigate("/"); 
        }, 1000);

      } else {
        setError(res.data.message || "Invalid Login");
      }
    } catch (err) {
      if (err.response) {
        setError(err.response?.data || "Invalid credentials");
      } else if (err.request) {
        setError("Network error. Please check if the server is running.");
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  return (
    // Use a soft, professional background
    <div className="flex items-center justify-center h-screen bg-stone-100">
      {/* Use a softer shadow and a rounded-xl for a more elegant card */}
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-4xl font-bold text-center text-emerald-700 mb-6">
          Welcome Back 👋
        </h1>
        <p className="text-center text-gray-500 mb-8">
          Please enter your credentials to log in.
        </p>

        {/* Status messages (unchanged, they are standard and clear) */}
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            {success}
          </div>
        )}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email or Username
            </label>
            <input
              type="text"
              placeholder="Enter your username or email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              // Update the focus ring to match the new accent color
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              // Update the focus ring to match the new accent color
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>

          <button
            type="submit"
            // Use the new emerald accent color for the primary button
            className="w-full bg-emerald-600 text-white py-2.5 rounded-lg font-semibold hover:bg-emerald-700 transition duration-300 shadow-md"
          >
            Log In
          </button>

          <p className="text-center text-gray-500 text-sm">
            Don't have an account?{" "}
            {/* Update the link color to match */}
            <Link to="/signup" className="text-emerald-600 hover:underline font-medium">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;