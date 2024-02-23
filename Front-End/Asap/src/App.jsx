import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import IncidentForm from "./IncidentForm";
import Component from "./Component";
import logo from "./assets/logo.png";
import Update from "./Update";

function App() {
  return (
    <Router>
      <div className="App">
        <nav id="main-nav">
          <div id="logo-text">
            <img id="logo" src={logo} />
            <p id="web-name">Storyberry</p>
          </div>
          <div id="nav-btns">

          <Link to="/">
            <button>Home</button>
          </Link>
          <Link to="/form">
            <button>Add data</button>
          </Link>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Component />} />
          <Route path="/update/:id" element={<Update />} />
          <Route path="/form" element={<IncidentForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
