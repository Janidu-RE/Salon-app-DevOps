import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';
import { API_BASE_URL } from '../config';

const MyAppointments = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (!userData) {
      navigate('/login');
      return;
    }

    const fetchAppointments = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/appointments/user/${userData.userId}`);
        setAppointments(res.data);
      } catch (err) {
        console.error("Error fetching appointments:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <div className="flex-grow">
        <div className="bg-emerald-50 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-extrabold text-emerald-800">My Appointments</h1>
            <p className="mt-4 text-xl text-gray-600">Track your scheduled visits.</p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {loading ? (
            <div className="text-center text-gray-500">Loading appointments...</div>
          ) : (
            <div className="space-y-6">
              {Array.isArray(appointments) && appointments.length > 0 ? (
                appointments.map((apt) => (
                  <div key={apt.id} className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 flex flex-col md:flex-row justify-between items-start md:items-center">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{apt.serviceName}</h3>
                      <p className="text-gray-500 mt-1">
                        <span className="font-medium text-gray-700">Date:</span> {apt.date} &nbsp;|&nbsp; 
                        <span className="font-medium text-gray-700"> Time:</span> {apt.time}
                      </p>
                    </div>
                    <div className="mt-4 md:mt-0">
                      <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                        apt.status === 'BOOKED' 
                          ? 'bg-green-100 text-green-800' 
                          : apt.status === 'PENDING'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {apt.status}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-500 py-10 border-2 border-dashed border-gray-200 rounded-xl">
                  You have no upcoming appointments.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MyAppointments;
