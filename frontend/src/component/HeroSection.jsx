import React from "react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-r from-emerald-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Janidu Hemachandra
              <span className="text-emerald-600 block">Natural Beauty</span>
            </h1>
            <p className="mt-6 text-xl text-gray-600 max-w-2xl">
              Experience premium salon services with expert stylists. Book your
              appointment and transform your look with SalonLK today.
            </p>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                to="/booking"
                className="bg-emerald-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-emerald-700 transition duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Book an Appointment
              </Link>
              <Link
                to="/services"
                className="border-2 border-emerald-600 text-emerald-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-emerald-600 hover:text-white transition duration-300"
              >
                Our Services
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-8 max-w-md mx-auto lg:mx-0">
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-600">500+</div>
                <div className="text-gray-600 mt-1">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-600">50+</div>
                <div className="text-gray-600 mt-1">Services</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-600">5★</div>
                <div className="text-gray-600 mt-1">Rating</div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              {/* Replace this div with your actual image */}
              <img
                src="/salon.jpg"
                alt="Woman getting her hair styled in a modern salon"
                className="w-full h-96 lg:h-[500px] object-cover"
              />
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-emerald-100 rounded-full opacity-50"></div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-emerald-200 rounded-full opacity-30"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
