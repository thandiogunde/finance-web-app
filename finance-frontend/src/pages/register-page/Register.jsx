import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import './Register.css';
import logo from '../../assets/logo.png';
import registerImage from '../../assets/register-banner.png';
import axios from 'axios';



const Register = ({setUser}) => {
  const navigate = useNavigate();
  // Step 1: Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [passwordStrength, setPasswordStrength] = useState('');
  const evaluateStrength = (password) => {
    let strength = 0;
  
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[\W_]/.test(password)) strength++;
  
    switch (strength) {
      case 0:
      case 1:
        return 'weak';
      case 2:
        return 'medium';
      case 3:
      case 4:
        return 'strong';
      default:
        return '';
    }
  };  

  const [password, setPassword] = useState('');
  const passwordRequirements = {
    length: password.length >= 8,
    number: /\d/.test(password),
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    special: /[^A-Za-z0-9]/.test(password)
  };
  

  // Step 2: Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === 'password') {
      setPasswordStrength(evaluateStrength(value));
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const strongPasswordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

  if (!strongPasswordPattern.test(formData.password)) {
    alert("Password must be at least 8 characters and include uppercase, lowercase, number, and special character.");
    return;
  }

  try {
    const res = await axios.post('https://finance-web-app-production-59d5.up.railway.app/api/register', formData);

    alert(res.data.message);
    console.log("Returned user from backend:", res.data.user); 
    // Store user info (if returned from backend)
    setUser(res.data.user);
    //  Redirect to admin page
    navigate('/admin');
    //Reset form
    setFormData({ name: '', email: '', password: '' });

  } catch (error) {
    if (error.response) {
      alert(error.response.data.message);
    } else {
      alert("Something went wrong. Please try again.");
    }
  }
};

  return (
    <div className="register-container">
      <div className="register-form">
        <Link to="/" className="close-btn">×</Link>

        <Link to="/">
          <img src={logo} alt="Fortuna Logo" className="register-logo" />
        </Link>

        <h1>Sign up</h1>

        <form onSubmit={handleSubmit}>
          <label>Name*</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="what would you like to be called?"
            required
          />

          <label>Email *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="yourname@gmail.com"
            required
          />

          <label>Password *</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="min. 8 characters"
            required
          />

       <div className={`strength-bar ${passwordStrength}`}></div>
       
       <ul className="password-rules">
  <li className={formData.password.length >= 8 ? 'valid' : 'invalid'}>
    {formData.password.length >= 8 ? '✔' : '✖'} At least 8 characters
  </li>
  <li className={/\d/.test(formData.password) ? 'valid' : 'invalid'}>
    {/\d/.test(formData.password) ? '✔' : '✖'} At least 1 number
  </li>
  <li className={/[a-z]/.test(formData.password) ? 'valid' : 'invalid'}>
    {/[a-z]/.test(formData.password) ? '✔' : '✖'} At least 1 lowercase letter
  </li>
  <li className={/[A-Z]/.test(formData.password) ? 'valid' : 'invalid'}>
    {/[A-Z]/.test(formData.password) ? '✔' : '✖'} At least 1 uppercase letter
  </li>
  <li className={/[^A-Za-z0-9]/.test(formData.password) ? 'valid' : 'invalid'}>
    {/[^A-Za-z0-9]/.test(formData.password) ? '✔' : '✖'} At least 1 special character
  </li>
</ul>


          <button type="submit" className="btn-main">Sign in</button>
        </form>

        <button className="btn-google">Sign in with Google</button>

        <p className="existing">
          Already a member? <Link to="/login">Sign in</Link>
        </p>
      </div>

      <div className="register-illustration">
        <img src={registerImage} alt="Register Visual" />
      </div>
    </div>
  );
};

export default Register;

