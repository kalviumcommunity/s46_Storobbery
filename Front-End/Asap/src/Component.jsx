import React, { useState, useEffect } from 'react';
import './App.css';

function Component() {
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/incidents')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setIncidents(data))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div id='component-main'>
      <h1>Incidents</h1>
      {incidents.map((incident, index) => (
        <div key={index} className="incident">
          <p>Incident ID: {incident.incidentID}</p>
          <p>Date Time: {incident.dateTime}</p>
          <p>Location: {incident.location.city}, {incident.location.state}</p>
          <p>Description: {incident.description}</p>
          <p>AmountStolen: {incident.amountStolen}</p>
          <div>descriptions about the robbery<br/>{incident.suspectInformation.descriptions.map((i,idx)=>(
            <p key={idx}>{i}</p>
          ))}</div>
          <p>Precense of Camera footage: {incident.securityCameraFootage.toString()}</p>
          <br></br>
        </div>
      ))}
    </div>
  ); 
}

export default Component;
