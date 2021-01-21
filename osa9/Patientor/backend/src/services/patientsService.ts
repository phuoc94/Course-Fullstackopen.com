import patientsData from '../../data/patients.json';
import { v4 as uuid } from 'uuid';
import { patientsNonSSN, Patient } from '../types';

const getEntries = (): patientsNonSSN[] => {
  return patientsData.map(({ id, name, gender, occupation, dateOfBirth }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addEntry = (
  name: string, dateOfBirth: string, ssn: string, gender: string, occupation: string
): Patient => {
  const id: string = uuid();
  const newPatent = {
    id: id,
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation,
  };

  patientsData.push(newPatent);
  return newPatent;
};

export default {
  getEntries,
  addEntry
};