import React, { useState, useEffect } from 'react';
import api from '../api';
import { Container, TextField, Button, List, ListItem, ListItemText } from '@mui/material';

interface Doctor {
  _id: string;
  name: string;
  specialty: string;
  availability: string[];
}

const DoctorComponent: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [name, setName] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [availability, setAvailability] = useState('');

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await api.get('/doctors');
      setDoctors(response.data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const addDoctor = async () => {
    try {
      const newDoctor = { name, specialty, availability: availability.split(',') };
      await api.post('/doctors', newDoctor);
      fetchDoctors();
    } catch (error) {
      console.error('Error adding doctor:', error);
    }
  };

  return (
    <Container>
      <h2>Doctor Management</h2>
      <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <TextField label="Specialty" value={specialty} onChange={(e) => setSpecialty(e.target.value)} />
      <TextField label="Availability (comma separated)" value={availability} onChange={(e) => setAvailability(e.target.value)} />
      <Button variant="contained" color="primary" onClick={addDoctor}>Add Doctor</Button>
      <List>
        {doctors.map((doctor) => (
          <ListItem key={doctor._id}>
            <ListItemText primary={doctor.name} secondary={`Specialty: ${doctor.specialty}`} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default DoctorComponent;
