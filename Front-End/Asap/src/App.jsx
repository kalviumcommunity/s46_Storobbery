import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Component from "./Component";
import LoginPage from "./LoginPage";
import Signup from "./Signup";
import Cookies from 'js-cookie'; 

function App() {
  const [login, setLogin] = useState(false);

  const handleLogout = () => {
    Cookies.remove("Username");
    setLogin(false); 
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
        </div>
      </nav>
      <Routes>
        <Route path="/home" element={<Component />} />
        <Route path='/signup' element={<Signup />} />
        {!login && <Route path="/login" element={<LoginPage setLogin={setLogin} />} />}
      </Routes>
    </div>
  );
}

export default App;