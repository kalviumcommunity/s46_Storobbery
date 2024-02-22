import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function Component() {
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    fetchIncidents();
  }, []);

  const fetchIncidents = () => {
    fetch("https://storoberry.onrender.com/api/incidents")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setIncidents(data))
      .catch((error) => console.error("Error:", error));
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `https://storoberry.onrender.com/d-delete/${id}`
      );
      console.log(response.data);
      fetchIncidents();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div id="component-main">
      <h1>Incidents</h1>
      {incidents.map((incident, index) => (
        <div key={index} className="incident">
          <p>Incident ID: {incident.incidentID}</p>
          <p>Date Time: {incident.dateTime}</p>
          <p>
            Location: {incident.location.city}, {incident.location.state}
          </p>
          <p>Description: {incident.description}</p>
          <p>AmountStolen: {incident.amountStolen}</p>
          <div>
            descriptions about the robbery
            <br />
            {incident.suspectInformation.descriptions.map((i, idx) => (
              <p key={idx}>{i}</p>
            ))}
          </div>
          <Link to={`/update/${incident._id}`}>
            <button>Update</button>
          </Link>
          <button onClick={() => handleDelete(incident._id)}>delete</button>
          {/* <p>Precense of Camera footage: {incident.securityCameraFootage.toString()}</p> */}
          <br></br>
        </div>
      ))}
    </div>
  );
}

export default Component;
