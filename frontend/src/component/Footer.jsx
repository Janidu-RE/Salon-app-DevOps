import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-emerald-800 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link to="/" className="text-3xl font-bold text-white mb-4 inline-block">
              Salon<span className="text-emerald-300">LK</span>
            </Link>
            <p className="text-emerald-100 mb-4 leading-relaxed">
              Your premier destination for beauty and wellness. We bring out your natural beauty with our expert stylists and premium services.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-emerald-300 transition duration-300">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="text-white hover:text-emerald-300 transition duration-300">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987c6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.22 14.815 3.73 13.664 3.73 12.367s.49-2.448 1.396-3.323c.875-.808 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.906.875 1.396 2.026 1.396 3.323s-.49 2.448-1.396 3.323c-.875.808-2.026 1.297-3.323 1.297z"/>
                </svg>
              </a>
              <a href="#" className="text-white hover:text-emerald-300 transition duration-300">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.016 10.016 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 002.46-2.543l-.047-.02z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-emerald-200">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-emerald-100 hover:text-white transition duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-emerald-100 hover:text-white transition duration-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-emerald-100 hover:text-white transition duration-300">
                  Our Services
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-emerald-100 hover:text-white transition duration-300">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-emerald-200">Our Services</h3>
            <ul className="space-y-2">
              <li><span className="text-emerald-100 hover:text-white transition duration-300 cursor-pointer">Hair Styling</span></li>
              <li><span className="text-emerald-100 hover:text-white transition duration-300 cursor-pointer">Hair Coloring</span></li>
              <li><span className="text-emerald-100 hover:text-white transition duration-300 cursor-pointer">Hair Treatments</span></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-emerald-200">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <svg className="h-5 w-5 text-emerald-300 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                <span className="text-emerald-100">123 Beauty Street, Colombo 07, Sri Lanka</span>
              </div>
              <div className="flex items-center">
                <svg className="h-5 w-5 text-emerald-300 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                <span className="text-emerald-100">+94 11 234 5678</span>
              </div>
              <div className="flex items-center">
                <svg className="h-5 w-5 text-emerald-300 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                <span className="text-emerald-100">info@salonlk.com</span>
              </div>
              <div className="flex items-center">
                <svg className="h-5 w-5 text-emerald-300 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span className="text-emerald-100">Mon - Sat: 9:00 AM - 7:00 PM</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-emerald-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-emerald-200 text-sm">
              © {new Date().getFullYear()} SalonLK. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-2 md:mt-0">
              <Link to="/privacy" className="text-emerald-200 hover:text-white text-sm transition duration-300">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-emerald-200 hover:text-white text-sm transition duration-300">
                Terms of Service
              </Link>
              <Link to="/cancellation" className="text-emerald-200 hover:text-white text-sm transition duration-300">
                Cancellation Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;