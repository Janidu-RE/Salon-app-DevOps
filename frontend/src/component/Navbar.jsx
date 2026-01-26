import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check login state on mount
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) setIsLoggedIn(true);
  }, []);

  // Listen to storage changes (works if login happens in another tab)
  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(localStorage.getItem("user") ? true : false);
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("user"); // changed from "userData" to "user"
    setIsLoggedIn(false);
    console.log("User signed out");
  };

  return (
    <nav className="bg-green-100 shadow-md py-4 px-8 flex items-center justify-between">
      {/* Left: Logo */}
      <Link
        to="/"
        className="text-3xl font-extrabold text-emerald-700 tracking-wide"
      >
        Salon<span className="text-emerald-500">LK</span>
      </Link>

      {/* Center: Links */}
      <div className="hidden md:flex space-x-8">
        <Link
          to="/about"
          className="text-gray-700 font-medium hover:text-emerald-600 transition duration-300"
        >
          About Us
        </Link>
        <Link
          to="/services"
          className="text-gray-700 font-medium hover:text-emerald-600 transition duration-300"
        >
          Our Services
        </Link>
        <Link
          to="/contact"
          className="text-gray-700 font-medium hover:text-emerald-600 transition duration-300"
        >
          Contact Us
        </Link>
      </div>

      {/* Right: Login / Sign Out */}
      <div>
        {isLoggedIn ? (
          <button
            onClick={handleSignOut}
            className="bg-red-500 text-white px-5 py-2 rounded-lg font-semibold hover:bg-emerald-700 transition duration-300 shadow-md"
          >
            Sign Out
          </button>
        ) : (
          <Link
            to="/login"
            className="bg-emerald-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-emerald-700 transition duration-300 shadow-md"
          >
            Login / Signup
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;