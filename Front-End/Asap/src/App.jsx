import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'; 
import "./App.css";
import Component from "./Component";
import rob from "./assets/asap-img.png";
import LoginPage from "./LoginPage";
import Signup from "./Signup";
import IncidentForm from "./IncidentForm";
import Update from "./Update";

function App() {
  const [login, setLogin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  }, []);
  // const miniQuotes = [
  //   "Stealing hurts, kindness heals.",
  //   "End theft, build trust.",
  //   "Stop theft, spread love.",
  //   "Robbery steals, unity heals.",
  //   "No to theft, yes to peace.",
  //   "Thieves harm, honesty protects.",
  //   "Theft divides, honesty unites.",
  //   "Say no to stealing.",
  //   "Robbery destroys, honesty strengthens.",
  //   "Choose honesty, reject theft.",
  //   "Stop stealing, start caring.",
  //   "Thieves damage, honesty mends.",
  //   "Stealing hurts us all.",
  //   "Theft damages, trust rebuilds.",
  //   "Say yes to integrity.",
  //   "No room for robbery.",
  //   "Reject theft, embrace integrity.",
  //   "Honesty wins, theft loses.",
  //   "End robbery, begin healing.",
  //   "Theft destroys communities, honesty rebuilds them."
  // ];
  // const randomNumber = Math.floor(Math.random() * miniQuotes.length);

  const handleLogout = () => {
    Cookies.remove("token");
    setLogin(false); 
    navigate('/home'); // Redirect to home page after logout
  };

  return (
    <div className="App">
      <nav id="main-nav">
        <div id="logo-text">
          <p id="web-name">Storyberry</p>
        </div>
        <div id="nav-btns">
          <Link to="/home">
            <button>Home</button>
          </Link>
          {login ? (
            <button onClick={handleLogout}>Log Out</button>
          ) : (
            <Link to="/login">
              <button>Login</button>
            </Link>
          )}
          <Link to="/post">
            <button>Add Data</button>
          </Link>
        </div>
      </nav>
      {/* <div id="top-div">
        <img id="img-rob" src={rob} alt="rob"></img>
        <div id="summary-div">
          Explore Robbery Incidents:
          <br />
          Browse recent robbery incidents categorized by location, type, and
          severity. Gain insights into trends and patterns through interactive
          data visualizations. Report an Incident
        </div>
        <div id="quote">
          <blockquote>{miniQuotes[randomNumber]}</blockquote>
        </div>
      </div> */}
      <Routes>
        <Route path="/home" element={<Component login={login} />} />
        <Route path="/post" element={<IncidentForm />} />
        <Route path="/signup" element={<Signup />} />
        {!login && <Route path="/login" element={<LoginPage setLogin={setLogin} />} />}
        <Route path="/update/:id" element={<Update />} />
      </Routes>
    </div>
  );
}

export default App;
