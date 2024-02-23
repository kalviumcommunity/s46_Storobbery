import React, { useState, useEffect } from "react";
import "./Component.css";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Load from "./assets/robber.gif";

function Component() {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    fetchIncidents();
  }, []);

  useEffect(() => {
    document.body.style.backgroundColor = loading ? "#7ecdc2" : "#98e09b";
  }, [loading]);

  const fetchIncidents = () => {
    setLoading(true);
    fetch("https://storoberry.onrender.com/api/incidents")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setIncidents(data);
        setLoading(false);
      })
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

  const getEmbeddedLink = (youtubeLink) => {
    const youtubeRegex = /^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
    if (youtubeRegex.test(youtubeLink)) {
      return youtubeLink.replace(
        /^(https?\:\/\/)?(www\.)?(youtube\.com\/(watch\?v=)?|youtu\.be\/)/,
        "https://www.youtube.com/embed/"
      );
    } else {
      return null;
    }
  };

  const playVideo = (incidentId) => {
    console.log("Selected Incident ID:", incidentId);
    setSelectedVideo(incidentId);
  };
  
  return (
    <div id="component-main">
      <h1 style={{ fontFamily: "Amatic SC, sans-serif" }}>Incidents</h1>
      {loading ? (
        <div>
          <img src={Load} alt="loading" />
          <p id="load-message">Robbing The Data Please Wait</p>
        </div>
      ) : (
        <>
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
              <div>
                <button onClick={() => playVideo(incident._id)}>Play</button>
                <Link to={`/update/${incident._id}`}>
                  <button className="btn-update">Update</button>
                </Link>
                <button
                  className="btn-delete"
                  onClick={() => handleDelete(incident._id)}
                >
                  Delete
                </button>
              </div>
              <br />
              <div id="youtube-div">
                
              {selectedVideo === incident._id && (
                <iframe
                  id="youtube"
                  width="600"
                  height="400"
                  src={getEmbeddedLink(incident.youtubeLink)}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              )}
              
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default Component;
