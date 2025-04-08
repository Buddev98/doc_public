import express from 'express';
import Patient from '../models/Patient';

const router = express.Router();

// Create a new patient
router.post('/', async (req, res) => {
  try {
    const patient = new Patient(req.body);
    await patient.save();
    res.status(201).send(patient);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all patients
router.get('/', async (req, res) => {
  try {
    const patients = await Patient.find();
    res.status(200).send(patients);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get a patient by ID
router.get('/:id', async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      res.status(404).send();
    }
    res.status(200).send(patient);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
