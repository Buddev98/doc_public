import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PatientComponent from './components/Patient';
import DoctorComponent from './components/Doctor';
import AppointmentComponent from './components/Appointment';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/patients" element={<PatientComponent />} />
        <Route path="/doctors" element={<DoctorComponent />} />
        <Route path="/appointments" element={<AppointmentComponent />} />
      </Routes>
    </Router>
  );
};

export default App;
