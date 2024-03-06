import { useState,React, CSSProperties } from "react";
// import ClipLoader from "react-spinners/ClipLoader";   
import axios from 'axios';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons';
import "./Login.css";

function LoginPage({ setLogin }) {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('https://storoberry.onrender.com/login', {
        user_id: formData.username,
        password: formData.password
      });
      console.log(response.data);
      setLogin(true);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError('An unexpected error occurred. Please try again later.');
      }
    }

    setLoading(false);
  };

  return (
    <div id="login-main">

    <div className="background">
      <div className="shape"></div>
      <form className="form" onSubmit={handleSubmit}>
        <h3>Login Here</h3>
        {error && <div className="error-message">{error}</div>}
        <div>
          <label htmlFor="username">Username:</label>
          <input className='login-inp' type="text" name="username" value={formData.username} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input className='login-inp' type="password" name="password" value={formData.password} onChange={handleChange} />
        </div>
        <button type="submit" id='submit-btn-login'  disabled={loading}>Login</button>
      <Link to='/signup'><p className="signup-link">Signup</p></Link>
      </form>
    </div>
    </div>
  );
}

export default LoginPage;
