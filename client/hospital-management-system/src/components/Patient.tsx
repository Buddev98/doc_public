import React, { useState, useEffect } from 'react';
import api from '../api';
import { Container, TextField, Button, List, ListItem, ListItemText } from '@mui/material';

interface Patient {
  _id: string;
  name: string;
  age: number;
  gender: string;
  contactInfo: {
    phone: string;
    email: string;
    address: string;
  };
  medicalHistory: string[];
}

const PatientComponent: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [name, setName] = useState('');
  const [age, setAge] = useState<number | undefined>(undefined);
  const [gender, setGender] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await api.get('/patients');
      setPatients(response.data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  const addPatient = async () => {
    try {
      const newPatient = { name, age, gender, contactInfo: { phone, email, address }, medicalHistory: [] };
      await api.post('/patients', newPatient);
      fetchPatients();
    } catch (error) {
      console.error('Error adding patient:', error);
    }
  };

  return (
    <Container>
      <h2>Patient Management</h2>
      <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <TextField label="Age" type="number" value={age} onChange={(e) => setAge(Number(e.target.value))} />
      <TextField label="Gender" value={gender} onChange={(e) => setGender(e.target.value)} />
      <TextField label="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
      <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <TextField label="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
      <Button variant="contained" color="primary" onClick={addPatient}>Add Patient</Button>
      <List>
        {patients.map((patient) => (
          <ListItem key={patient._id}>
            <ListItemText primary={patient.name} secondary={`Age: ${patient.age}, Gender: ${patient.gender}`} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default PatientComponent;
