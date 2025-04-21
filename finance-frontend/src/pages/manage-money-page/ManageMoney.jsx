import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ManageMoney.css';
import manageImage from '../../assets/manage-banner.png'; // import your image
import { Link } from 'react-router-dom';

const ManageMoney = ({ user, onLogout }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login'); // redirect if not logged in
    }
  }, [user, navigate]);

  return (
    <div>

      <div className="breadcrumb">
        Home <span>&gt;</span> <span className="active">Manage Money</span>
      </div>

      <div className="manage-hero">
        <div className="manage-text">
          <h1>Manage My Money</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Aenean euismod bibendum laoreet.
          </p>
        </div>
        <img src={manageImage} alt="Manage Money Visual" />
      </div>

      <div className="calculators">
      <p>⚠️ Please note: Details entered through the financial tools are not shared, sold or used commercially. Read <a href="/privacy-policy">Privacy Policy</a></p>
        <div className="calculator-card">
          <h2>Savings Calculator</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Aenean euismod bibendum laoreet.
          </p>
          <Link to="/savings-calculator">
            <button className="start-btn">Start Now</button>
        </Link>

        </div>

        <div className="calculator-card">
          <h2>Budget Calculator</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Aenean euismod bibendum laoreet.
          </p>
          <Link to="/budget-calculator">
            <button className="start-btn">Start Now</button>
        </Link>
        </div>
        </div>
    </div>
  );
};

export default ManageMoney;
