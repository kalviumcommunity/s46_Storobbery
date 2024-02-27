// App.js
import React, { useState } from "react";
import {  Routes, Route, Link } from "react-router-dom";
import "./App.css";
import IncidentForm from "./IncidentForm";
import Component from "./Component";
import logo from "./assets/logo.png";
import Update from "./Update";
import LoginPage from "./LoginPage";
import Signup from "./Signup";

function App() {
  const [login, setLogin] = useState(false);

  return (
      <div className="App">
        <nav id="main-nav">
          <div id="logo-text">
            <img id="logo" src={logo} alt="Logo" />
            <p id="web-name">Storyberry</p>
          </div>
          <div id="nav-btns">
            <Link to="/">
              <button>Home</button>
            </Link>
            <Link to={!login?'/login':'/form'}>
              <button>{!login ?"Login":"Add Data"}</button>
            </Link>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Component />} />
          <Route path="/update/:id" element={<Update />} />
          <Route path='/signup' element={<Signup />} />
          <Route path="/form" element={<IncidentForm />} />
          {/* Render LoginPage component conditionally */}
          {!login && <Route path="/login" element={<LoginPage setLogin={setLogin} />} />} 
        </Routes>
      </div>
  );
}

export default App;
