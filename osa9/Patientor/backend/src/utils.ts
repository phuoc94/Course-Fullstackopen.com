/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { newPatientEntry, Gender } from './types';

const isString = (text: any): text is string => {
    return typeof text === 'string' || text instanceof String;
};
const isDate = (dob: string): boolean => {
    return Boolean(Date.parse(dob));
};
const isGender = (gender: any): gender is Gender => {
    return Object.values(Gender).includes(gender);
  };
  

const parseName = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name: ' + name);
  }
  return name;
};
const parseDOB = (dateOfBirth: any): string => {
    if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
      throw new Error('Incorrect or missing DOB: ' + dateOfBirth);
    }
    return dateOfBirth;
};
const parseSSN = (ssn: any): string => {
    if (!ssn || !isString(ssn)) {
      throw new Error('Incorrect or missing SSN: ' + ssn);
    }
    return ssn;
};
const parseGender = (gender: any): Gender => {
    if (!gender || !isGender(gender)) {
      throw new Error('Incorrect or missing Gender: ' + gender);
    }
    return gender;
  };
const parseOccupation = (occupation: any): string => {
    if (!occupation || !isString(occupation)) {
      throw new Error('Incorrect or missing Occupation: ' + occupation);
    }
    return occupation;
  };
  

const toNewPatientEntry = (object: any): newPatientEntry => {

  const newEntry: newPatientEntry = {
    name: parseName(object.name),
    dateOfBirth: parseDOB(object.dateOfBirth),
    ssn: parseSSN(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
  };

  return newEntry;
};

export default { toNewPatientEntry };