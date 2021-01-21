import express from 'express';
import patientsService from '../services/patientsService';
const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientsService.getEntries());
});

router.post('/', (req, res) => {
  const { name, dateOfBirth, ssn, gender, occupation } = req.body;
  const newPatient = patientsService.addEntry(
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation
  );
  res.json(newPatient);
});

export default router;