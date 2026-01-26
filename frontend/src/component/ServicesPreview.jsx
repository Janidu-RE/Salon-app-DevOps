import React from "react";
import { Link } from "react-router-dom";

const ServicesPreview = () => {
  const services = [
    {
      name: "Hair Styling",
      description: "Professional haircuts and styling",
      price: "From Rs.700.00"
    },
    {
      name: "Hair Coloring",
      description: "Expert coloring services",
      price: "From Rs.1200.00"
    },
    {
      name: "Skin Care",
      description: "Rejuvenating facial treatments",
      price: "From Rs.800.00"
    },
    {
      name: "Makeup",
      description: "Professional makeup services",
      price: "From Rs.750.00"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
            Our <span className="text-emerald-600">Services</span>
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our wide range of premium beauty and wellness services
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-white to-emerald-50 border border-emerald-100 rounded-xl p-6 hover:shadow-lg transition duration-300"
            >
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-emerald-600 text-lg">✨</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {service.name}
              </h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-emerald-600 font-bold">{service.price}</span>
                <button className="text-emerald-600 hover:text-emerald-700 font-semibold text-sm">
                  Learn More →
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/services"
            className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-bold text-lg"
          >
            View All Services
            <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesPreview;