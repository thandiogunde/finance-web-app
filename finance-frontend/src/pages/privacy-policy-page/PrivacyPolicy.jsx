import React from 'react';
import './PrivacyPolicy.css';
import HeaderBar from '../../components/header-bar/HeaderBar';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';

const PrivacyPolicy = ({ user, onLogout }) => {
  return (
    <>
      <HeaderBar isLoggedIn={!!user} onLogout={onLogout} />
      <Navbar isAdmin={!!user} />
      <div className="breadcrumb">Home <span>&gt;</span> <span className="active">Privacy Policy</span></div>

      <section className="privacy-banner">
        <h1>Privacy Policy</h1>
        <p>Last updated: April 01, 2025</p>
        <br/>
        <p>How Fortuna protects your data and respect your financial privacy rights.</p>
      </section>

      <section className="privacy-content">
        <p>⚠️ Please note: This website is part of a university dissertation project and is not a live or commercial platform. Any data entered is used solely for academic demonstration purposes and is not shared externally.</p>
        <h2>1. Introduction</h2>
        <p>At Fortuna, we care about your privacy. This policy outlines how we collect, use, and protect your personal data when you use our website.</p>

        <h2>2. What Data We Collect</h2>
        <p>We may collect and temporarily store the following data to demonstrate functionality:</p>
  <ul>
    <li><strong>User Information:</strong> Name, email, and password (used for login and registration).</li>
    <li><strong>Personal Budget Data:</strong> Income, expenses, savings goals, and categories that you input into the calculators.</li>
    <li><strong>Messages:</strong> Information you may enter via the contact form (name, email, message content).</li>
  </ul>
  <p>This data is only used to showcase features and is not shared, sold, or used commercially.</p>

  <h2>3. How Your Data Is Used</h2>
  <p>
    All data collected is used <strong>only within the scope of this academic project</strong>, specifically to:
  </p>
  <ul>
    <li>Demonstrate personalized financial tools (e.g., calculators and charts)</li>
    <li>Allow user login/logout functionality</li>
    <li>Show how financial literacy platforms can work in practice</li>
    <li>Respond to contact form submissions (for demonstration purposes only)</li>
  </ul>

  <h2>4. Data Storage & Security</h2>
  <p>
    Data is stored securely in a local MongoDB database. It is accessible only on the development machine and not deployed publicly. Passwords are encrypted, and all forms of data access are controlled.
  </p>

  <h2>5. Cookies & Tracking</h2>
  <p>
    This website may use basic cookies or session storage to improve functionality (e.g., keeping users logged in), but no third-party tracking tools are used.
  </p>

  <h2>6. User Rights</h2>
  <p>
    User data is not permanently stored or connected to real-world accounts. However, you may request that your data be removed at any time by contacting us.
  </p>

  <h2>7. Contact</h2>
  <p>
    If you have any questions about this Privacy Policy or how your data is handled, please reach out via <a href="/contact">Contact Us</a>
  </p>

      </section>

    </>
  );
};

export default PrivacyPolicy;

