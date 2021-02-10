import React from 'react';
import { Patient, Entry, Diagnosis } from "../types";


const Entries = (patient: Patient) => {
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
                            (diagonsisCode: Diagnosis['code']) => (
                                <li key={diagonsisCode}>{diagonsisCode}</li>
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
