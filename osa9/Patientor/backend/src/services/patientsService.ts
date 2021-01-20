import patientsData from '../../data/patients.json';

import { patientsNonSSN } from '../types';

const getEntries = (): patientsNonSSN[] => {
  return patientsData.map(({ id, name, gender, occupation, dateOfBirth }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addEntry = () => {
  return null;
};

export default {
  getEntries,
  addEntry
};