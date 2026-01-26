import React from "react";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-emerald-600 to-emerald-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
          Ready to Transform Your Look?
        </h2>
        <p className="text-xl text-emerald-100 mb-8 max-w-3xl mx-auto">
          Book your appointment now and experience the best salon services in town. 
          Your journey to beauty starts here.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/booking"
            className="bg-white text-emerald-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Book Appointment Now
          </Link>
          <Link
            to="/contact"
            className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-emerald-600 transition duration-300"
          >
            Contact Us
          </Link>
        </div>

        <div className="mt-8 text-emerald-200">
          <p>📞 Call us: +94 11 234 5678</p>
          <p className="mt-2">🕒 Open: Mon-Sat 9:00 AM - 7:00 PM</p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;