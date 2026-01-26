import React from 'react'
import Navbar from '../component/Navbar'
import Footer from '../component/Footer'
import HeroSection from '../component/HeroSection.jsx'
import FeaturesSection from '../component/FeaturesSection.jsx'
import ServicesPreview from '../component/ServicesPreview.jsx'
import CTASection from '../component/CTASection.jsx'

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar/>
      <HeroSection/>
      <FeaturesSection/>
      <ServicesPreview/>
      <Footer/>
    </div>
  )
}

export default Home
