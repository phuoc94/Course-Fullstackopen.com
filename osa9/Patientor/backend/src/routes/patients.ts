import express from 'express';
import patientsService from '../services/patientsService';
import utils from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientsService.getEntries());
});

router.get('/:id', (req, res) => {
  res.send(patientsService.getPatientID(req.params.id));
});

router.post('/', (req, res) => {
  try {
    const newPatient = utils.toNewPatientEntry(req.body);
    const addedPatient = patientsService.addEntry(newPatient);
    res.json(addedPatient);
  } catch (e) {
    if(e instanceof Error) {
      res.status(400).send(e.message);
    }else {
        throw e;
    }
  }
});

export default router;