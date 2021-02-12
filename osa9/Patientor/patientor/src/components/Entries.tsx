import React from 'react';
import { Patient, Entry, Diagnosis, HospitalEntry, OccupationalHealthcareEntry, HealthCheckEntry } from "../types";
import { useStateValue } from "../state";
import { Segment, Icon  } from 'semantic-ui-react';

const Hospital: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
    return (
        <div>
            <h3>
                {entry.date} <Icon name="hospital" size="big" />
            </h3>
            <p>
                <i>{entry.description}</i>
            </p>
        </div>
    );
  };
  
const OccupationalHealthcare: React.FC<{entry: OccupationalHealthcareEntry}> = ({ entry }) => {
    return (
        <div>
            <h3>
                {entry.date} <Icon name="user doctor" size="big" />
            </h3>
            <p>
                <i>{entry.description}</i>
            </p>
        </div>
    );
};
  
const HealthCheck: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
    return (
        <div>
            <h3>
                {entry.date} <Icon name="medkit" size="big" />
            </h3>
            <p>
                <i>{entry.description}</i>
            </p>
        </div>
    );
};

const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
    switch (entry.type) {
        case 'Hospital':
            return <Hospital entry={entry} />;
        case 'OccupationalHealthcare':
            return <OccupationalHealthcare entry={entry} />;
        case 'HealthCheck':
            return <HealthCheck entry={entry} />;
        default:
            return assertNever(entry);
    }
};

const Entries = (patient: Patient) => {
    const [{ diagnosis }] = useStateValue();
    return (
        <div>
            <h2>entries</h2>
            {patient.entries.map((entry: Entry) => {
                return(
                    <Segment key={entry.id}>
                    <EntryDetails entry={entry} />
                        <ul>
                        {entry.diagnosisCodes &&
                            entry.diagnosisCodes.map(
                            (diagonsisCode: Diagnosis['code'],) => (
                                <li key={diagonsisCode}>{diagonsisCode} {diagnosis[diagonsisCode] && diagnosis[diagonsisCode].name}</li>
                            )
                        )}
                        </ul>
                    </Segment>
                );
            })}
        </div>
    );
};

export default Entries;
