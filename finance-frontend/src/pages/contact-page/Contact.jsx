import React, { useState } from 'react';
import './Contact.css';
import contactImage from '../../assets/contact-image.png'; // update path as needed
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';
import axios from 'axios';
import successImage from '../../assets/success-icon.png'; // update path as needed


const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);

  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loader
    try {
      const res = await axios.post('http://localhost:5050/api/contact', formData);
      console.log(res.data.message); // Optional: check success in console
    setShowSuccessPopup(true); 
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      console.error("Error sending message:", err);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false); // Stop loader
    }
  };

  return (
    <div className="page-wrapper">
      <div className = "contact-container">
      <div className="contact-form-section">
        <Link to="/" className="close-btn">×</Link>
        <img src={logo} alt="Fortuna Logo" className="contact-logo" />
        <h1>Contact Us</h1>
        <form onSubmit={handleSubmit}>
          <label>Name*</label>
          <input
            type="text"
            name="name"
            placeholder="what would you like to be called?"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label>Email *</label>
          <input
            type="email"
            name="email"
            placeholder="yourname@gmail.com"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>Message*</label>
          <textarea
            name="message"
            placeholder="Write your message here..."
            value={formData.message}
            onChange={handleChange}
            required
          />
          {loading && <div className="spinner"></div>}

          {showSuccessPopup && (
  <div className="success-popup">
    <div className="popup-card">
    <img src={successImage} alt="Success" className="check-icon" />
      <h3>Message Sent!</h3>
      <p>Your message has been successfully sent.</p>
      <button onClick={() => setShowSuccessPopup(false)}>OK</button>
    </div>
  </div>
)}

          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? "Sending..." : "Send"}
        </button>

        </form>
      </div>

      <div className="contact-illustration">
        <img src={contactImage} alt="Contact Visual" />
      </div>
    </div>
    </div>
  );
};

export default Contact;
