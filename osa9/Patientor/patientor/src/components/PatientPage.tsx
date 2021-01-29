import React from 'react';
import axios from "axios";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { useStateValue, updatePatient } from "../state";
import { Patient,Gender } from "../types";
import { Icon } from 'semantic-ui-react';

const PatientPage = () => {
    const { id } = useParams<{ id: string }>();
    const [patient, setPatient] = React.useState<Patient | undefined>();
    const [{ patients }, dispatch] = useStateValue();
    React.useEffect(() => {
        const fetchPatient = async () => {
          try {
            console.log('fetch');
            const { data: patientAPI } = await axios.get<Patient>(
              `${apiBaseUrl}/patients/${id}`
            );
            dispatch(updatePatient(patientAPI));
            setPatient(patientAPI);
          } catch (e) {
            console.error(e);
          }
        };
        if (patients[id] && patients[id].ssn) {
          setPatient(patients[id]);
        } else {
          fetchPatient();
        }
      }, [dispatch, id, patients]);
    const getIcon = (gender: Gender) => {
      switch (gender) {
          case 'male':
            return 'mars';
      
          case 'female':
            return 'venus';
      
          default:
            return 'genderless';
        }
    };

    return (
        <div>
        {patient && (
            <>
            <h2>{patient.name} <Icon name={getIcon(patient.gender)} /></h2>
            <p>
                ssn:{patient.ssn}<br/>
                occupation:{patient.occupation}
            </p>
            
            </>
        )}
        </div>
    );
};

export default PatientPage;
