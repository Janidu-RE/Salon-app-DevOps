import React from 'react'
import Login from '../component/Login/Login'
import Navbar from '../component/Navbar'
import Footer from '../component/Footer'

const LoginPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow">
        <Login/>
      </div>
      <Footer />
    </div>
  )
}

export default LoginPage