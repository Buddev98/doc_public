import React, { useState, useEffect } from 'react';
import api from '../api';
import { Container, TextField, Button, List, ListItem, ListItemText } from '@mui/material';

interface Appointment {
  _id: string;
  patient: string;
  doctor: string;
  date: string;
  status: string;
}

const AppointmentComponent: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [patient, setPatient] = useState('');
  const [doctor, setDoctor] = useState('');
  const [date, setDate] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await api.get('/appointments');
      setAppointments(response.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const addAppointment = async () => {
    try {
      const newAppointment = { patient, doctor, date, status };
      await api.post('/appointments', newAppointment);
      fetchAppointments();
    } catch (error) {
      console.error('Error adding appointment:', error);
    }
  };

  return (
    <Container>
      <h2>Appointment Management</h2>
      <TextField label="Patient ID" value={patient} onChange={(e) => setPatient(e.target.value)} />
      <TextField label="Doctor ID" value={doctor} onChange={(e) => setDoctor(e.target.value)} />
      <TextField label="Date" type="date" value={date} onChange={(e) => setDate(e.target.value)} InputLabelProps={{ shrink: true }} />
      <TextField label="Status" value={status} onChange={(e) => setStatus(e.target.value)} />
      <Button variant="contained" color="primary" onClick={addAppointment}>Add Appointment</Button>
      <List>
        {appointments.map((appointment) => (
          <ListItem key={appointment._id}>
            <ListItemText primary={`Patient: ${appointment.patient}, Doctor: ${appointment.doctor}`} secondary={`Date: ${appointment.date}, Status: ${appointment.status}`} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default AppointmentComponent;
