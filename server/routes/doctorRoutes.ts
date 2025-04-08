import express from 'express';
import Doctor from '../models/Doctor';

const router = express.Router();

// Create a new doctor
router.post('/', async (req, res) => {
  try {
    const doctor = new Doctor(req.body);
    await doctor.save();
    res.status(201).send(doctor);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all doctors
router.get('/', async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.status(200).send(doctors);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get a doctor by ID
router.get('/:id', async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      res.status(404).send();
    }
    res.status(200).send(doctor);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
