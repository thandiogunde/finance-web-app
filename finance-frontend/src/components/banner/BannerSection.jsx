import React from 'react';
import './BannerSection.css';
import manageImage from '../../assets/manage-banner.png'; 
import { Link } from 'react-router-dom';

const BannerSection = () => {
  return (
    <section className="banner">
      <div className="banner-content">
        <div className="banner-text">
          <h1>Plan for tomorrow's goals, today</h1>
          <p>
            Take control of your financial future with smart planning tools and personalized advice
            that help you reach your goals faster and with confidence.
          </p>
          <div className="banner-cta">
            <Link to="/register" className="banner-btn-link">
              <button className="banner-btn">Get started</button>
            </Link>
            <Link to="/learning" className="learn-more-link">
              Learn more
            </Link>
          </div>
        </div>
        <div className="banner-image">
          <img src={manageImage} alt="Person planning finances" />
        </div>
      </div>
    </section>
  );
};

export default BannerSection;