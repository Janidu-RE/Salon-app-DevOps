import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import './index.css'

import LoginPage from './pages/LoginPage'
import Signup from './pages/Signup'
import Home from './pages/Home'
import Services from './pages/Services'
import About from './pages/About'
import Contact from './pages/Contact'
import BookAppointment from './pages/BookAppointment'
import MyAppointments from './pages/MyAppointments'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/services" element={<Services/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/booking" element={<BookAppointment/>} />
        <Route path="/my-appointments" element={<MyAppointments/>} />
      </Routes>
    </Router>
  )
}

export default App
