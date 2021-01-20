import express from 'express';
import patientsService from '../services/patientsService';
const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientsService.getEntries());
});

router.post('/', (_req, res) => {
  res.send('Saving a diagnoses!');
});

export default router;