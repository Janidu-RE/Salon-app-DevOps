import React from 'react';
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <div className="flex-grow">
        <div className="bg-emerald-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-extrabold text-emerald-800">Contact Us</h1>
            <p className="mt-4 text-xl text-gray-600">We'd love to hear from you.</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Get in Touch</h3>
                <p className="text-gray-600 mb-6">
                  Have questions or want to book an appointment? Reach out to us using the form or the details below.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <span className="text-emerald-600 font-bold mr-3">📍</span>
                    <p className="text-gray-700">123 Salon Avenue, Colombo 03, Sri Lanka</p>
                  </div>
                  <div className="flex items-start">
                    <span className="text-emerald-600 font-bold mr-3">📞</span>
                    <p className="text-gray-700">+94 11 234 5678</p>
                  </div>
                  <div className="flex items-start">
                    <span className="text-emerald-600 font-bold mr-3">✉️</span>
                    <p className="text-gray-700">hello@salonlk.com</p>
                  </div>
                </div>
              </div>

              <div className="bg-stone-50 p-6 rounded-xl">
                 <h3 className="text-xl font-bold text-gray-900 mb-2">Opening Hours</h3>
                 <ul className="space-y-2 text-gray-600">
                    <li className="flex justify-between"><span>Mon - Fri:</span> <span>9:00 AM - 8:00 PM</span></li>
                    <li className="flex justify-between"><span>Saturday:</span> <span>9:00 AM - 6:00 PM</span></li>
                    <li className="flex justify-between"><span>Sunday:</span> <span>10:00 AM - 4:00 PM</span></li>
                 </ul>
              </div>
            </div>

            {/* Form */}
            <div className="bg-white p-8 border border-gray-200 rounded-2xl shadow-sm">
              <form className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Name</label>
                  <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none" placeholder="Your Name" />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Email</label>
                  <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none" placeholder="your@email.com" />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Message</label>
                  <textarea rows="4" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none" placeholder="How can we help you?"></textarea>
                </div>
                <button type="button" className="w-full bg-emerald-600 text-white font-bold py-3 rounded-lg hover:bg-emerald-700 transition duration-300">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
