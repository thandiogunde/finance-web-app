import React from 'react';
import './DailyTips.css';
import { Link } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import HeaderBar from '../../components/header-bar/HeaderBar';
import tipsImage from '../../assets/daily-tips-banner.png';

import icon1 from '../../assets/tip-track.png';
import icon2 from '../../assets/tip-cook.png';
import icon3 from '../../assets/tip-24hour.png';
import icon4 from '../../assets/tip-roundup.png';
import icon5 from '../../assets/tip-balance.png';
import icon6 from '../../assets/tip-energy.png';
import icon7 from '../../assets/tip-savings.png';
import icon8 from '../../assets/tip-podcast.png';
import icon9 from '../../assets/tip-free.png';

const tips = [
    {
      title: 'Track your spending',
      icon: icon1,
      description: 'Keep a daily log of your expenses to identify where your money goes and where you can save.'
    },
    {
      title: 'Cook at home',
      icon: icon2,
      description: 'Preparing meals at home is usually healthier and more cost-effective than eating out!'
    },
    {
      title: '24 hour rule',
      icon: icon3,
      description: 'Wait 24 hours before making non-essential purchases to avoid impulse buying.'
    },
    {
      title: 'Round-Up',
      icon: icon4,
      description: 'Automatically round up your purchases and save the spare change for a rainy day.'
    },
    {
      title: 'Check your balance',
      icon: icon5,
      description: 'Review your bank balance regularly to stay in control and avoid overspending.'
    },
    {
      title: 'Save Energy!',
      icon: icon6,
      description: 'Unplug devices and switch off lights to lower your energy bills and protect the planet.'
    },
    {
      title: 'Automate Savings',
      icon: icon7,
      description: 'Set up automatic transfers to your savings account each payday. Pay yourself first!'
    },
    {
      title: 'Podcast Hour',
      icon: icon8,
      description: 'Listen to a financial advice podcast to learn new tips and stay motivated on your finance journey.'
    },
    {
      title: 'Free Entertainment Day',
      icon: icon9,
      description: 'Try a no-spend day with free activities like hiking or reading at the library.'
    }
  ];
  

const DailyTips = ({ user, onLogout}) => {
  return (
    <>
    <div className="daily-tips-container">
          <div className="breadcrumb">Home <span>&gt;</span> <span className="active">Daily Tips</span></div>
          <div className="tips-hero">
          <div className="tips-hero-text">
              <h1>Daily Tips & Challenges</h1>
              <p>Whether you’re saving for something big or just trying to stay on top of bills, these bite-sized challenges are perfect for forming smart money habits and leveling up your everyday decisions!</p>
              <br/>
              <p>Take charge of your finances one tip at a time! </p>
          </div>
          <img src={tipsImage} alt="Daily Tips Visual" />
          </div>

          <section className="tips-grid">
              {tips.map((tip, index) => (
                  <div className="tip-card" key={index}>
                      <div className="tip-inner">
                          <div className="tip-front">
                              <img src={tip.icon} alt={tip.title} />
                              <h3>{tip.title}</h3>
                          </div>
                          <div className="tip-back">
                              <p>{tip.description}</p>
                          </div>
                      </div>
                  </div>

                  /*<div key={index} className="tip-card">
                    <img src={tip.icon} alt={tip.title} />
                    <h3>{tip.title}</h3>
                    <p>{tip.text}</p> {}
                  </div>*/
              ))}
          </section>
          <button className="load-btn">Load all</button>
          <br/>
      </div>
      </>
  );
};

export default DailyTips;
