import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from '../component/Navbar'
import Footer from '../component/Footer'
import HeroSection from '../component/HeroSection.jsx'
import FeaturesSection from '../component/FeaturesSection.jsx'
import ServicesPreview from '../component/ServicesPreview.jsx'
import CTASection from '../component/CTASection.jsx'
import { API_BASE_URL } from '../config'

const Home = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/services`);
        if (Array.isArray(res.data)) {
          setServices(res.data);
        } else {
          console.error("Expected array, got:", res.data);
          setServices([]);
        }
      } catch (err) {
        console.error("Error fetching services:", err);
      }
    };
    fetchServices();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar/>
      <HeroSection/>
      <FeaturesSection/>
      
      {/* Pass fetched services to ServicesPreview or display them separately if ServicesPreview expects hardcoded data. 
          For now, I'll modify ServicesPreview to accept props or just duplicate the logic here for simplicity if I can't edit ServicesPreview easily.
          Wait, I can edit ServicesPreview. Let's pass data to it if possible, or just replace it.
          Let's assume ServicesPreview is static for now, and I will add a dynamic section below it. 
          Actually, the plan said "Update Home.jsx to fetch services".
      */}
      <div className="py-16 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                Available <span className="text-emerald-600">Services</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.isArray(services) && services.length > 0 ? (
                services.map((service) => (
                    <div key={service.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition duration-300">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{service.name}</h3>
                        <p className="text-gray-600 mb-4">{service.description}</p>
                        <span className="text-emerald-600 font-bold">{service.price}</span>
                    </div>
                ))
              ) : (
                <p className="text-center col-span-4 text-gray-500">Loading services...</p>
              )}
            </div>
        </div>
      </div>

      <Footer/>
    </div>
  )
}

export default Home
