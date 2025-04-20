import React from 'react';
import './About.css';
import aboutImage from '../../assets/about-image.png'; 

const AboutUs = ({ user, onLogout }) => {
  return (
    <div className="about-container">
      <div className="about-left">
        <h1>About Us</h1>
        <p>
          Welcome to our company! We are dedicated to providing exceptional services 
          and products that make a difference in people's lives. Our team of experts 
          brings years of experience and passion to every project we undertake. 
          We believe in innovation, quality, and customer satisfaction as our core values.
          Through continuous improvement and dedication, we strive to exceed expectations 
          and create lasting relationships with our clients.
        </p>
      </div>
      <div className="about-right">
        <img src={aboutImage} alt="About our company" />
      </div>
    </div>
  );
};

export default AboutUs;