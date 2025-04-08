import express from 'express';
import Billing from '../models/Billing';

const router = express.Router();

// Create a new billing record
router.post('/', async (req, res) => {
  try {
    const billing = new Billing(req.body);
    await billing.save();
    res.status(201).send(billing);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all billing records
router.get('/', async (req, res) => {
  try {
    const billings = await Billing.find();
    res.status(200).send(billings);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get a billing record by ID
router.get('/:id', async (req, res) => {
  try {
    const billing = await Billing.findById(req.params.id);
    if (!billing) {
      res.status(404).send();
    }
    res.status(200).send(billing);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
