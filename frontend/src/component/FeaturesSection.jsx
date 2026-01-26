import React from "react";

const FeaturesSection = () => {
  const features = [
    {
      icon: "🎯",
      title: "Expert Stylists",
      description: "Certified professionals with years of experience"
    },
    {
      icon: "💎",
      title: "Premium Products",
      description: "High-quality products for the best results"
    },
    {
      icon: "⏰",
      title: "Easy Booking",
      description: "Book your appointment in just a few clicks"
    },
    {
      icon: "💰",
      title: "Best Prices",
      description: "Competitive pricing with no hidden costs"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
            Why Choose <span className="text-emerald-600">SalonLK</span>
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            We are committed to providing you with the best salon experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition duration-300 text-center"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;