import React from 'react';
import { BrowserRouter as Router, Routes, Route ,Link} from 'react-router-dom';
import './App.css';
import IncidentForm from './IncidentForm';
import Component from './Component';

function App() {
  return (
    <Router>
      <div className="App">
        <nav>

        <Link to="/">
          <button>Home</button>
        </Link>
        <Link to="/form">
          <button>Add data</button>
        </Link>
        </nav>
        <Routes>
          <Route path="/" element={<Component />} />
          <Route path="/form" element={<IncidentForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
