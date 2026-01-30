import React from 'react';
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <div className="flex-grow">
        {/* Header */}
        <div className="bg-emerald-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-extrabold text-emerald-800">About Us</h1>
            <p className="mt-4 text-xl text-gray-600">Redefining elegance and wellness.</p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Founded in 2023, SalonLK began with a simple mission: to provide high-quality beauty services in a relaxing and luxurious environment. 
              We believe that self-care is not just a luxury, but a necessity. Our team of expert stylists and therapists are dedicated to helping you look and feel your best.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-stone-50 rounded-xl">
                <div className="text-4xl mb-4">💎</div>
                <h3 className="text-xl font-bold mb-2">Excellence</h3>
                <p className="text-gray-600">We strive for perfection in every service we provide.</p>
              </div>
              <div className="text-center p-6 bg-stone-50 rounded-xl">
                <div className="text-4xl mb-4">🌿</div>
                <h3 className="text-xl font-bold mb-2">Sustainability</h3>
                <p className="text-gray-600">We use eco-friendly and cruelty-free products.</p>
              </div>
              <div className="text-center p-6 bg-stone-50 rounded-xl">
                <div className="text-4xl mb-4">❤️</div>
                <h3 className="text-xl font-bold mb-2">Care</h3>
                <p className="text-gray-600">Your comfort and satisfaction are our top priorities.</p>
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
