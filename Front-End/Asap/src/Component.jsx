import React, { useState, useEffect } from "react";
import "./Component.css";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Load from "./assets/robber.gif";
import rob from "./assets/asap-img.png";
import { IoMdCloseCircle } from "react-icons/io";
import { FaCirclePlay } from "react-icons/fa6";
import ReactPlayer from "react-player";



function Component() {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    fetchIncidents();
  }, []);

  // useEffect(() => {
  //   document.body.style.backgroundColor = loading ? "#7ecdc2" : "";
  // }, [loading]);

  const miniQuotes = [
    "Stealing hurts, kindness heals.",
    "End theft, build trust.",
    "Stop theft, spread love.",
    "Robbery steals, unity heals.",
    "No to theft, yes to peace.",
    "Thieves harm, honesty protects.",
    "Theft divides, honesty unites.",
    "Say no to stealing.",
    "Robbery destroys, honesty strengthens.",
    "Choose honesty, reject theft.",
    "Stop stealing, start caring.",
    "Thieves damage, honesty mends.",
    "Stealing hurts us all.",
    "Theft damages, trust rebuilds.",
    "Say yes to integrity.",
    "No room for robbery.",
    "Reject theft, embrace integrity.",
    "Honesty wins, theft loses.",
    "End robbery, begin healing.",
    "Theft destroys communities, honesty rebuilds them."
  ];
const randomNumber = Math.floor(Math.random()*miniQuotes.length)
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
        console.log("Incidents Data:", data);
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

  const playVideo = (incidentId) => {
    console.log("Selected Incident ID:", incidentId);
    setSelectedVideo(incidentId);ṭ
  };

  return (
    <>
      <div id="top-div">
        <img id="img-rob" src={rob}></img>
        <div id="summary-div">Explore Robbery Incidents:

Browse recent robbery incidents categorized by location, type, and severity.
Gain insights into trends and patterns through interactive data visualizations.
Report an Incident
</div>
<div id="quote"><blockquote>{miniQuotes[randomNumber]}</blockquote></div>
      </div>
      <div id="component-main">
        <h1 style={{ fontFamily: "Amatic SC, sans-serif" }}>Incidents</h1>
        {loading ? (
          <div>
            <img src={Load} alt="loading" />
            <p id="load-message">Robbing The Data Please Wait</p>
          </div>
        ) : (
          <>
          <div id="grid-incidents">

            {incidents.map((incident) => (
              <div key={incident._id} className="incident">
                <p>Username: {incident.username}</p>
                <p>Date Time: {incident.dateTime}</p>
                <p>
                  Location: {incident.location.city}, {incident.location.state}
                </p>
                <p>Description: {incident.description}</p>
                <p>AmountStolen: {incident.amountStolen}</p>
                <div>
                  descriptions about the robbery
                  <br />
                </div>
                <FaCirclePlay size={30} className="play-button" onClick={() => playVideo(incident._id)} fill={"white"} />
                <div>
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
                <div id="yotube-div">
                  {selectedVideo === incident._id && (
                    <div id="sub-yt-div">
                      <ReactPlayer
                        url={incident.youtubeLink}
                        width="900px"
                        height="500px"
                        controls={true}
                        
                        />
                      <IoMdCloseCircle id="close-btn" onClick={()=>setSelectedVideo(null)} size={30} fill={"red"} />
                    </div>
                  )}
                </div>
              </div>
            ))}
            </div>
          </>
        )}
      </div>
    </>
    );
}

export default Component;
