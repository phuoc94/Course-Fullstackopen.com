import React from 'react';
import { Patient, Entry, Diagnosis } from "../types";
import { useStateValue } from "../state";


const Entries = (patient: Patient) => {
    const [{ diagnosis }] = useStateValue();
    return (
        <div>
            <h2>entries</h2>
            {patient.entries.map((entry: Entry) => {
                return(
                    <div key={entry.id}>
                        <p>
                            {entry.date} {entry.description}
                        </p>
                        <ul>
                        {entry.diagnosisCodes &&
                            entry.diagnosisCodes.map(
                            (diagonsisCode: Diagnosis['code'],) => (
                                <li key={diagonsisCode}>{diagonsisCode} {diagnosis[diagonsisCode] && diagnosis[diagonsisCode].name}</li>
                            )
                        )}
                        </ul>
                    </div>
                );
            })}
        </div>
    );
};

export default Entries;
