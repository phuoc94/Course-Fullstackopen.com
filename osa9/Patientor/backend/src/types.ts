export interface Diagnose {
    code: string;
    name: string;
    latin?: string;
}

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
}

export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: string;
    occupation: string;
}
export type patientsNonSSN = Omit<Patient, 'ssn'>;
export type newPatientEntry = Omit<Patient, 'id'>;

