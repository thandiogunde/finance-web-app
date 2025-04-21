import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import logo from '../../assets/logo.png';
import loginImage from '../../assets/register-banner.png';
import axios from 'axios';

const Login = ({ setUser }) => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    try {
      console.log("Attempting login with:", loginData);
      const res = await axios.post('https://finance-web-app-production-59d5.up.railway.app/api/login', loginData);
      console.log("Login response:", res.data);
      
      localStorage.setItem('user', JSON.stringify(res.data.user));
      setUser(res.data.user);
      navigate('/admin');
    } catch (error) {
      console.error("Login error:", error.response ? error.response.data : error);
      setErrorMessage(error.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <Link to="/" className="close-btn">×</Link>

        <Link to="/">
          <img src={logo} alt="Fortuna Logo" className="login-logo" />
        </Link>

        <h1>Welcome back!</h1>

        {errorMessage && <div className="error-message">{errorMessage}</div>}

        <form onSubmit={handleSubmit}>
          <label>Email *</label>
          <input
            type="email"
            name="email"
            value={loginData.email}
            onChange={handleChange}
            placeholder="yourname@gmail.com"
            required
          />

          <label>Password *</label>
          <input
            type="password"
            name="password"
            value={loginData.password}
            onChange={handleChange}
            placeholder="min. 8 characters"
            required
          />

          <p className="forgot-password">Forgot password?</p>

          <button type="submit" className="btn-main">Sign in</button>
        </form>

        <button className="btn-google">Sign in with Google</button>

        <p className="switch-form">
          Don't have an account? <Link to="/register">Sign up</Link>
        </p>
      </div>

      <div className="login-illustration">
        <img src={loginImage} alt="Login Visual" />
      </div>
    </div>
  );
};

export default Login;