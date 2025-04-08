import express from 'express';
import MedicalRecord from '../models/MedicalRecord';

const router = express.Router();

// Create a new medical record
router.post('/', async (req, res) => {
  try {
    const medicalRecord = new MedicalRecord(req.body);
    await medicalRecord.save();
    res.status(201).send(medicalRecord);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all medical records
router.get('/', async (req, res) => {
  try {
    const medicalRecords = await MedicalRecord.find();
    res.status(200).send(medicalRecords);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get a medical record by ID
router.get('/:id', async (req, res) => {
  try {
    const medicalRecord = await MedicalRecord.findById(req.params.id);
    if (!medicalRecord) {
      res.status(404).send();
    }
    res.status(200).send(medicalRecord);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
