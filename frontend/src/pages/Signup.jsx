import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../config";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // --- Client-side validation ---
    if (!username || !email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // --- API Call ---
    try {
      // Send only the data needed by the backend's SignupRequest DTO
      const res = await axios.post(`${API_BASE_URL}/auth/signup`, {
        username: username,
        email: email,
        password: password,
      });

      // Your backend returns a simple string on success
      setSuccess(res.data || "User registered successfully! Please log in.");
      setError("");

      // Clear the form on successful registration
      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      // You might want to add a 2-second delay and then redirect to login
      // setTimeout(() => {
      //   window.location.href = '/login'; // Or use React Router's navigate
      // }, 2000);

    } catch (err) {
      if (err.response) {
        // Your backend returns the error message in the response body
        setError(err.response?.data || "Registration failed. Please try again.");
      } else if (err.request) {
        setError("Network error. Please check if the server is running.");
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      {/* Use the same soft, professional background */}
      <div className="flex-grow flex items-center justify-center bg-stone-100 py-12">
        {/* Use the same elegant card styling */}
        <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
          <h1 className="text-4xl font-bold text-center text-emerald-700 mb-6">
            Create Account ✨
          </h1>
          <p className="text-center text-gray-500 mb-8">
            Join us and book your next appointment with ease.
          </p>
  
          {/* Status Messages */}
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
                Username
              </label>
              <input
                type="text"
                placeholder="Choose a username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>
  
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>
  
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>
  
            <button
              type="submit"
              // Use the same emerald accent color for the primary button
              className="w-full bg-emerald-600 text-white py-2.5 rounded-lg font-semibold hover:bg-emerald-700 transition duration-300 shadow-md"
            >
              Sign Up
            </button>
  
            <p className="text-center text-gray-500 text-sm">
              Already have an account?{" "}
              {/* Update the link to point to login */}
              <Link to="/login" className="text-emerald-600 hover:underline font-medium">
                Log in
              </Link>
            </p>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Signup;