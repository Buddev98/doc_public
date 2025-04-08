import express from 'express';
import Appointment from '../models/Appointment';

const router = express.Router();

// Create a new appointment
router.post('/', async (req, res) => {
  try {
    const appointment = new Appointment(req.body);
    await appointment.save();
    res.status(201).send(appointment);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all appointments
router.get('/', async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.status(200).send(appointments);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get an appointment by ID
router.get('/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      res.status(404).send();
    }
    res.status(200).send(appointment);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
