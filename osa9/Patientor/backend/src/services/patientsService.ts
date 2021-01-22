import patientsData from '../../data/patients.json';
import { v4 as uuid } from 'uuid';
import { patientsNonSSN, newPatientEntry, Patient } from '../types';

const getEntries = (): patientsNonSSN[] => {
  return patientsData.map(({ id, name, gender, occupation, dateOfBirth }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};


const addEntry = (newPatientNonID: newPatientEntry): Patient => {
  const id: string = uuid();
  const newPatent = {
    id,
    ...newPatientNonID
  };
  patientsData.push(newPatent);
  return newPatent;
};

export default {
  getEntries,
  addEntry
};