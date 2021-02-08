import patientsData from '../../data/patients';
import { v4 as uuid } from 'uuid';
import { PublicPatient, newPatientEntry, Patient } from '../types';

const getEntries = (): PublicPatient[] => {
  return patientsData.map(({ id, name, gender, occupation, dateOfBirth }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const getPatientID = (id: string): Patient | undefined => {
  return patientsData.find(x=> x.id === id);
};

const addEntry = (newPatientNonID: newPatientEntry): Patient => {
  const id: string = uuid();
  const newPatent = {
    id,
    ...newPatientNonID,
    entries: []
  };
  patientsData.push(newPatent);
  return newPatent;
};

export default {
  getEntries,
  addEntry,
  getPatientID
};