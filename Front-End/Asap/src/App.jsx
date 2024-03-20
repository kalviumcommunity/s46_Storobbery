import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import "./App.css";
import Component from "./Component";
import LoginPage from "./LoginPage";
import Signup from "./Signup";
import Cookies from 'js-cookie'; 
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
